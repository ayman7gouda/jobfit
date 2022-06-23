import { PrismaClient } from '@prisma/client';

import { groupByArray } from '../../lib/utils';
import { HandbookErrorMessage, messages } from './errorMessages';
import { NodeFactory } from './nodes';
import { cartesian, combinations, fact } from './shared';

import type {
  ClientHandbook,
  Pathway,
  ProcessingState,
  ProgramResult,
  Sequence,
} from "./types";

export async function validateProgram(id: number, db: PrismaClient) {
  NodeFactory.init();

  if (db == null) {
    throw new Error("Client not specified!");
  }

  let program = await db.program.findFirst({
    where: { id },
    include: { handbook: true },
  });
  if (program == null) {
    throw new Error("Program does not exist!");
  }

  // return validateProgramNodes(program.handbook as ClientHandbook[]);
}

function programResult(result: Partial<ProgramResult>): ProgramResult {
  return {
    pathways: [],
    message: undefined,
    ...result,
  };
}

function processNode(node: ClientHandbook, handbook: ClientHandbook[]) {
  let result = [node];

  if (node.folder && node.selection === "AND") {
    let children = handbook.filter((f) => f.parentId === node.id);
    for (let child of children) {
      if (child.type !== "collection") {
        result.push(...processNode(child, handbook));
      }
    }
  }
  return result;
}

export function generateSequence(handbook: ClientHandbook[]): ClientHandbook[] {
  if (!handbook || handbook.length == 0) {
    throw new Error(
      messages(HandbookErrorMessage.HandbookNotProcessed).message
    );
  }

  // find root node
  // if there is more than one root node we throw error
  let roots = handbook.filter((h) => h.parentId === 0);
  if (roots.length != 1) {
    throw new Error(messages(HandbookErrorMessage.CompulsoryRootNode).message);
  }

  // find all the child nodes of the root node and start processing them
  // 1. we must fulfil every node
  // 2. the collection node must only be fulfilled if we selected from it
  // 3. with or node that have variable number of selections, we consider them
  //    fulfilled if we fulfil our global goal finding:
  //      - 240 credits for the program
  //      - 80 credits for a major
  //      - 40 credits for minor

  handbook.sort((a, b) => (a.index! < b.index! ? -1 : 1));

  let programs = handbook.filter((h) => h.type === "program");
  if (programs.length > 0) {
    roots = programs;
  }

  return processNode(roots[0], handbook);
}

export function evaluateSequence(
  sequence: ClientHandbook[],
  handbook: ClientHandbook[]
) {
  /////////////////////
  // calculate credits
  /////////////////////

  let credits = sequence.reduce((prev, next) => {
    if (next.type === "subject") {
      return (prev += next.credits || 10);
    }
    if (next.selection === "OR") {
      if (next.maxNumber || (next.number && next.maxNumber === 0)) {
        throw new Error(
          'Minimum and maximum selection can only exist as children of an "OR" node specifying exact selection.'
        );
      }
      if (!next.number) {
        throw new Error(
          "You need to specify exact number of selected subjects!"
        );
      }
      prev += (next.number > 10 ? next.number / 10 : next.number) * 10;
    }
    return prev;
  }, 0);

  ///////////////////////////
  // calculate combinations
  ///////////////////////////

  let combinations = 1;

  //////////////////////////////////////////
  // add all OR nodes with subject children
  //////////////////////////////////////////

  let orWithSubjects = sequence.filter(
    (s) =>
      s.type === "folder" &&
      s.selection === "OR" &&
      handbook
        .filter((h) => h.parentId === s.id)
        .every((e) => e.type === "subject")
  );

  for (let item of orWithSubjects) {
    let children = handbook.filter((h) => h.parentId === item.id);
    let num = creditToNumber(item.number!);

    combinations *=
      (fact(children.length) / fact(num)) * fact(children.length - num);
  }

  //////////////////////////////////////
  // add all link nodes               //
  //////////////////////////////////////

  // if we use a link to collection and collection contains external links
  // we will create combinations of these link

  // then for each link we calculate combinations

  return {
    credits,
    combinations,
  };
}

function creditToNumber(num: number) {
  return num >= 10 ? num / 10 : num;
}

export function expandSequence(sequence: Sequence, cull = false) {
  // go to the root
  while (sequence.parent != null) {
    sequence.parent.child = sequence;
    sequence = sequence.parent;
  }

  let finalSequence: ClientHandbook[] = sequence.items;

  while (sequence.child != null) {
    finalSequence = finalSequence.flatMap((p) => {
      if (sequence.child!.items.some((s) => s.replaces === p.id)) {
        return sequence.child!.items.filter((s) => s.replaces === p.id);
      }
      return p;
    });
    sequence = sequence.child;
  }

  // remove orphaned children from replacements
  finalSequence = finalSequence.filter((s) =>
    finalSequence.some((f) => s.parentId == 0 || f.id === s.parentId)
  );

  if (cull) {
    finalSequence = finalSequence.map((s: any) => {
      return Object.keys(s).reduce((prev: any, next) => {
        if (s[next] != null) {
          prev[next] = s[next];
        }
        return prev;
      }, {});
    });
  }

  return finalSequence;
}

export function expandSequence2(sequence: Sequence, cull = false) {
  let finalSequence: ClientHandbook[] = sequence.items;

  while (sequence.parent != null) {
    finalSequence = sequence.parent.items.flatMap((p) => {
      if (finalSequence.some((s) => s.replaces === p.id)) {
        return finalSequence.filter((s) => s.replaces === p.id);
      }
      return p;
    });
    sequence = sequence.parent;
  }

  // remove orphaned children from replacements
  finalSequence = finalSequence.filter((s) =>
    finalSequence.some((f) => s.parentId == 0 || f.id === s.parentId)
  );

  if (cull) {
    finalSequence = finalSequence.map((s: any) => {
      return Object.keys(s).reduce((prev: any, next) => {
        if (s[next] != null) {
          prev[next] = s[next];
        }
        return prev;
      }, {});
    });
  }

  return finalSequence;
}

let levelRegex: { [index: string | number]: RegExp } = {
  1: /1\d\d\d/,
  2: /2\d\d\d/,
  3: /3\d\d\d/,
  4: /4\d\d\d/,
  5: /5\d\d\d/,
  6: /6\d\d\d/,
  7: /7\d\d\d/,
};

export function generateSequences(
  sequence: ClientHandbook[],
  handbook: ClientHandbook[],
  externals?: Map<number, Pathway[]>
): Sequence[] {
  let queue: Sequence[] = [];

  // 1. remove all collections that have no reference in the handbook

  handbook = handbook.filter(
    (h) => h.type !== "collection" || handbook.some((s) => s.reference === h.id)
  );

  // 2. browse all collection links
  //    - create combinations of collections with their children and add them to the processing queue

  let collectionsWithChildren = handbook
    .filter((h) => h.type === "collection")
    .map((h) => {
      // we will be creating combinations of these element, so we will also remember the original collection
      let children = handbook
        .filter(
          (c) => c.parentId === h.id && c.type && c.type.indexOf("link:") === 0
        )
        .map((c) => ({ ...c, collection: h.collection }));

      return {
        collection: h,
        linkChildren: children,
        otherChildren: handbook.filter(
          (c) => c.parentId === h.id && c.type && c.type.indexOf("link:") === -1
        ),
      };
    });
  let collectionsWithLinkChildren = collectionsWithChildren.filter(
    (c) => c.linkChildren.length
  );

  // create combinations of subjects

  let collectionsWithoutLinks = collectionsWithChildren
    .filter((c) => c.linkChildren.length == 0 && c.otherChildren.length > 0)
    .map((c) => ({ ...c.collection, collectionChildren: c.otherChildren }));

  // create combinations of link

  if (collectionsWithLinkChildren.length) {
    // we will create all possible combinations of links from the collections
    // for example:
    //  if collection A had ['link:A', 'link:B']
    //  and collection B had ['link:A', link:C'] I will have all possible combinations of these references
    //  such as [[link:A, link:A], [link:A, link:C], [link:B, link:A], [link:B, link:C]]

    let collectionCombinations = cartesian(
      collectionsWithLinkChildren.map((c) => c.linkChildren)
    );

    for (let combination of collectionCombinations) {
      // we will now browse each collection group and add as many link elements into replacement collection as we can

      let collectionsWithLinks: ClientHandbook[] = [];

      for (let collectionCombination of combination) {
        let collection = collectionsWithChildren.find(
          (c) => c.collection.id === collectionCombination.collection
        );
        if (!collection) {
          throw new Error(
            "Reference collection not found!: " + combination[0].collection
          );
        }

        let collectionNode: ClientHandbook = {
          ...collection.collection,
          collectionChildren: [
            collectionCombination,
            ...collection.otherChildren,
          ],
        };
        collectionsWithLinks.push(collectionNode);
      }

      let rootSequence: Sequence = {
        parent: null,
        items: [
          ...sequence,
          ...collectionsWithoutLinks,
          ...collectionsWithLinks,
        ],
      };
      queue.push(rootSequence);

      // for (let collectionLink of collectionLinkGroups) {

      //   // get its children
      //   let collectionChildren = handbook.filter(
      //     (h) => h.parentId === collection!.id
      //   );
      //   let linkChildren = collectionChildren.filter(
      //     (c) => c.type && c.type.indexOf("link:") === 0
      //   );

      //   if (linkChildren.length > 0) {
      //   } else {
      //   }
      // }
    }
  } else if (collectionsWithoutLinks.length) {
    let rootSequence: Sequence = {
      parent: null,
      items: [...sequence, ...collectionsWithoutLinks],
    };
    queue.push(rootSequence);
  } else {
    let rootSequence: Sequence = {
      parent: null,
      items: sequence,
    };
    queue.push(rootSequence);
  }

  // TODO: Now browse all initial nodes and if we have there a collection wih an OR node, expand it!

  let finished = [];

  // expand all collections

  while (queue.length) {
    // clear all the finished queue items
    let current = queue.pop();
    if (!current) {
      break;
    }

    // create a "final" version of the sequence
    const currentSequence = expandSequence(current);

    // 1. browse from leafs to the root and start expanding collection links
    const collectionLinks = currentSequence.filter(
      (s) => s.type && s.type === "link:collection"
    );

    const toExpand = currentSequence.filter(
      (s) => s.folder && s.selection === "OR"
    );

    if (collectionLinks.length) {
      let replacements = expandCollectionLinks(
        current,
        currentSequence,
        collectionLinks
      );
      queue.push(...replacements);
    } else if (toExpand.length) {
      // 2. once collection links are removed, we expand external links (if required)

      // 3. once all the links are expanded, we can expand OR nodes

      // group the or nodes by their type so that we have better control about multiple replacements
      // such as those linking to a major or a minor
      let groups = groupByArray(toExpand, (s) => s.type + (s.reference || ""));

      for (let group of groups) {
        // expand the node and get all the replacements
        let replacements =
          group.values[0].type === "folder"
            ? expandFolders(current, group.values, handbook, externals)
            : [];

        // put back all the replacements
        queue.push(...replacements);
      }
    } else {
      finished.push(current);
    }
  }

  return finished;
}

function expandFolders(
  parentSequence: Sequence,
  nodes: ClientHandbook[],
  handbook: ClientHandbook[],
  externals: Map<number, Pathway[]>
): Sequence[] {
  let nodeReplacements = nodes.map((c) => expandFolder(c, handbook, externals));
  let result: Sequence[] = [];

  for (let combination of cartesian(nodeReplacements)) {
    result.push({
      items: combination.flat(),
      parent: parentSequence,
    });
  }
  return result;
}

function expandFolder(
  node: ClientHandbook,
  handbook: ClientHandbook[],
  externals: Map<number, Pathway[]>
): ClientHandbook[][] {
  let children = handbook.filter((h) => h.parentId === node.id);
  let result: ClientHandbook[][] = [];

  // when expanding a folder, the child nodes can only be subjects
  // meaning we have to expand links prior to expanding folder
  if (children.some((c) => c.type !== "subject")) {
    throw new Error("We can only expand folder with subjects");
  }

  if (!node.number) {
    throw new Error("Unsupported");
  }

  let num = creditToNumber(node.number);

  // if there are min / max values we follow the parent restrictions
  // TODO: handle min and max
  for (let combination of combinations(children, num)) {
    result.push(combination.map((c) => ({ ...c, replaces: node.id })));
  }
  return result;
}

let guid = Date.now();

// function expandCollectionLinks(
//   currentSequence: ClientHandbook[],
//   collectionLinks: ClientHandbook[]
// ): Sequence[] {
//   let result: Sequence[] = [];

//   let groups = groupByArray(collectionLinks, "reference");

//   // now, for each group create combinations of selections

//   let groupReplacements: ClientHandbook[][][] = [];
//   for (let group of groups) {
//     let collection = currentSequence.find(
//       (s) => s.id === group.values[0].reference
//     );
//     if (!collection) {
//       throw new Error("Collection not found: " + group.values[0].reference);
//     }

//     // 1. if the collection has only one child is it an external link, as a result we replace all the references
//     // the collection references then become link:X references
//     if (
//       collection.collectionChildren &&
//       collection.collectionChildren.length == 1
//     ) {
//       let replacements: ClientHandbook[] = [];
//       for (let collectionLink of collectionLinks) {
//         // this becomes a simple link node with all the selection criteria from the parent
//         replacements.push({
//           ...collectionLink,
//           replaces: collectionLink.id,
//           type: collection.collectionChildren[0].type,
//           number: collectionLink.number,
//           maxNumber: collectionLink.maxNumber,
//           selection: collectionLink.selection,
//         });
//       }
//       groupReplacements.push([replacements]);
//     }
//     // 2. the collection contains more elements so we need to create combinations of selections
//     // we create combination for each level
//     else {
//       let replacements: ClientHandbook[] = [];
//       let levelBucket = [];
//       let levelSelections = groupByArray(group.values, "level");

//       // find how many elements we are selecting from the current collection

//       for (let level of levelSelections) {
//         let tempCollection = multiplyLinks(
//           collection,
//           levelSelections.values.length
//         );

//         if (level.key == null) {
//           levelBucket.push(
//             ...combinations(tempCollection, level.values.length)
//           );
//         } else {
//           let levelCollection = tempCollection.filter(
//             (f) =>
//               f.type !== "subject" ||
//               (f.subjectCode && f.subjectCode.match(levelRegex[level.key]))
//           );
//           levelBucket.push(
//             ...combinations(levelCollection, level.values.length)
//           );
//         }
//       }
//     }

//     // // let selectingChildren =

//     // // find how many elements are there in the collection

//     // let totalChildren = collection.collectionChildren!.reduce((prev, next) => {
//     //   if (next.type === "link:major") {
//     //     return prev + 8;
//     //   } else if (next.type === "link:minor") {
//     //     return prev + 4;
//     //   } else if (next.type === "link:program") {
//     //     return prev + 24;
//     //   }
//     //   return prev + 1;
//     // }, 0);
//   }

//   return result;

//   // result.push({
//   //   items: replacements,
//   //   parent: sequence,
//   // });

//   // for (let collectionLink of collectionLinks) {
//   //   let collection = currentSequence.find(
//   //     (s) => s.id === collectionLink.reference
//   //   );
//   //   if (!collection) {
//   //     throw new Error("Collection not found: " + collectionLink.reference);
//   //   }

//   //   if (
//   //     collection.collectionChildren &&
//   //     collection.collectionChildren.length > 1
//   //   ) {
//   //     // this becomes an OR node to choose X of the children
//   //   } else if (
//   //     collection.collectionChildren &&
//   //     collection.collectionChildren.length == 1
//   //   ) {
//   //     // this becomes a simple link node with all the selection criteria from the parent
//   //     replacements.push({
//   //       ...collectionLink,
//   //       replaces: collectionLink.id,
//   //       type: collection.collectionChildren[0].type,
//   //       number: collectionLink.number,
//   //       maxNumber: collectionLink.maxNumber,
//   //       selection: collectionLink.selection,
//   //     });
//   //   } else {
//   //     throw new Error("Expanded collection has no children");
//   //   }
//   // }
// }

// export function validateProgramNodes(handbook: ClientHandbook[], externals: Map<number, Pathway[]>) {
//   if (!handbook || handbook.length == 0) {
//     return programResult({
//       message: messages(HandbookErrorMessage.HandbookNotProcessed),
//     });
//   }

//   // find root node
//   // if there is more than one root node we throw error
//   let root = handbook.filter((h) => h.parentId === 0);
//   if (root.length != 1) {
//     return programResult({
//       message: messages(HandbookErrorMessage.CompulsoryRootNode),
//     });
//   }

//   // find all the child nodes of the root node and start processing them
//   // 1. we must fulfil every node
//   // 2. the collection node must only be fulfilled if we selected from it
//   // 3. with or node that have variable number of selections, we consider them
//   //    fulfilled if we fulfil our global goal finding:
//   //      - 240 credits for the program
//   //      - 80 credits for a major
//   //      - 40 credits for minor

//   let parsed = handbook.map((h) => NodeFactory.create(h, handbook, externals));
//   let parsedRoot = parsed.find((p) => p.node.parentId === 0)!;

//   let currentPathway: Pathway = {
//     credits: 0,
//     pathwayCount: 1,
//     sequence: [],
//     name: root[0].text || "Root",
//   };
//   let state: ProcessingState = {
//     currentPathway,
//     pathways: [currentPathway],
//   };

//   parsedRoot.process(state);

//   return programResult(state);
// }

// async function processNode(
//   item: Handbook,
//   sourceQueue: Handbook[],
//   processedNodes: number[],
//   state: ProcessingState
// ) {
//   // check if node

//   processedNodes.push(item.id);

//   if (item.type === "subject") {
//     state.currentPathway.credits += 10;
//   }

//   if (item.folder) {
//     let children = sourceQueue.filter((s) => s.parentId === item.id);
//     for (let child of children) {
//       processNode(child, sourceQueue, processedNodes, state);
//     }
//   }
// }

let id = 100000;

function multiplyLinks(collection: ClientHandbook, max?: number) {
  if (collection.collectionChildren == null) {
    throw new Error("Collection must contain children");
  }
  let original = [
    ...collection.collectionChildren.filter(
      (c) => c.type.indexOf("link:") === -1
    ),
  ];
  let links = collection.collectionChildren.filter(
    (l) => l.type.indexOf("link:") === 0
  );
  let linkGroups = groupByArray(links, "reference");

  for (let linkGroup of linkGroups) {
    // all the links now become single selections
    for (let child of linkGroup.values) {
      if (child.number != null && child.number != 0) {
        max = creditToNumber(child.number);
      } else if (child.maxNumber != null) {
        throw new Error(
          "We do not support advanced selection in mixed collections"
        );
      }
      if (child.selection === "AND") {
        throw new Error('Links can only be "OR" nodes with selection');
      }
    }

    let type = linkGroup.values[0].type;

    max =
      max ||
      (type === "link:program"
        ? 24
        : type === "link:major"
        ? 8
        : type === "link:minor"
        ? 4
        : 0);

    for (let i = 0; i < max; i++) {
      let cid = id++;
      original.push({
        ...linkGroup.values[0],
        number: 1,
        maxNumber: null,
        id: cid,
        nodeId: cid,
      });
    }
  }
  return original;
}

export function expandCollections(
  handbook: ClientHandbook[]
): ClientHandbook[][] {
  let queue: ClientHandbook[][] = [];

  // 1. remove all collections that have no reference in the handbook

  handbook = handbook.filter(
    (h) => h.type !== "collection" || handbook.some((s) => s.reference === h.id)
  );

  // 2. browse all collection links
  //    - create combinations of collections with their children and add them to the processing queue

  let collectionsWithChildren = handbook
    .filter((h) => h.type === "collection")
    .map((h) => {
      // we will be creating combinations of these element, so we will also remember the original collection
      let children = handbook
        .filter(
          (c) => c.parentId === h.id && c.type && c.type.indexOf("link:") === 0
        )
        .map((c) => ({ ...c, collection: h.id }));

      return {
        collection: h,
        linkChildren: children,
        otherChildren: handbook.filter(
          (c) => c.parentId === h.id && c.type && c.type.indexOf("link:") === -1
        ),
      };
    });
  let collectionsWithLinkChildren = collectionsWithChildren.filter(
    (c) => c.linkChildren.length
  );

  // create combinations of subjects

  let collectionsWithoutLinks = collectionsWithChildren
    .filter((c) => c.linkChildren.length == 0 && c.otherChildren.length > 0)
    .map((c) => ({ ...c.collection, collectionChildren: c.otherChildren }));

  if (collectionsWithLinkChildren.length) {
    // we will create all possible combinations of links from the collections
    // for example:
    //  if collection A had ['link:A', 'link:B']
    //  and collection B had ['link:A', link:C'] I will have all possible combinations of these references
    //  such as [[link:A, link:A], [link:A, link:C], [link:B, link:A], [link:B, link:C]]

    let collectionCombinations = cartesian(
      collectionsWithLinkChildren.map((c) => c.linkChildren)
    );

    for (let combination of collectionCombinations) {
      // we will now browse each collection group and add as many link elements into replacement collection as we can

      let collectionsWithLinks: ClientHandbook[] = [];

      for (let collectionCombination of combination) {
        let collection = collectionsWithChildren.find(
          (c) => c.collection.id === collectionCombination.collection
        );
        if (!collection) {
          throw new Error(
            "Reference collection not found!: " + combination[0].collection
          );
        }

        let collectionNode: ClientHandbook = {
          ...collection.collection,
          collectionChildren: [
            collectionCombination,
            ...collection.otherChildren,
          ],
        };

        // multiply the children nodes
        collectionNode.collectionChildren = multiplyLinks(collectionNode);

        collectionsWithLinks.push(collectionNode);
      }

      let items = [...collectionsWithoutLinks, ...collectionsWithLinks];
      queue.push(items);
    }
  } else if (collectionsWithoutLinks.length) {
    queue.push([...collectionsWithoutLinks]);
  } else {
    // queue.push([]);
  }
  return queue;
}

export function expandOrNodes(handbook: ClientHandbook[]): Sequence[] {
  let result: Sequence[] = [];

  let rootSequence: Sequence = {
    parent: null,
    items: [...handbook],
  };

  let queue = [rootSequence];

  while (queue.length) {
    let currentSequence = queue.pop();
    if (currentSequence == null) {
      throw new Error("Not happening!");
    }

    // render sequence
    // this generates a full sequence with all nodes
    let expanded = expandSequence(currentSequence);

    // we consider or nodes only the ones with filter
    let orNodes = expanded.filter(
      (c) => c.selection === "OR" && c.type === "folder"
    );

    // if we eliminated all the or nodes we are good to finish this one
    if (orNodes.length == 0) {
      result.push(currentSequence);
      continue;
    }

    // // 1. try to find nodes that specify "minimum"
    // //    the "minimum" exists if number is specified and maxNumber is 0
    // let firstOr = orNodes.find((o) => o.maxNumber == 0 && !!o.number);
    // if (firstOr) {
    //   let children = handbook.filter((h) => h.parentId === firstOr!.parentId);
    //   let allWithMinimum = children.filter(
    //     (o) => o.maxNumber == 0 && !!o.number
    //   );
    //   let parent = handbook.find((n) => n.id === firstOr!.parentId);
    //   if (parent == null || !parent.number || parent.maxNumber != null) {
    //     throw new Error(
    //       "If you specify minimum, you need to specify exact number on the parent node"
    //     );
    //   }
    //   continue;
    // }

    // // 2. try to find nodes with "maximum"
    // //    the "maximum" exists if "maxNumber" is specified and "number" is 0
    // firstOr = orNodes.find((o) => !!o.maxNumber && o.number == 0);
    // if (firstOr) {
    //   let parent = handbook.find((n) => n.id === firstOr!.parentId);
    //   if (parent == null || !parent.number || parent.maxNumber != null) {
    //     throw new Error(
    //       "If you specify maximum, you need to specify exact number on the parent node"
    //     );
    //   }
    //   continue;
    // }

    // process any other node
    let firstOr = orNodes[0];

    if (firstOr && firstOr.number == 0 && firstOr.maxNumber == null) {
      throw new Error("Each OR folder must contain numeric selection");
    }

    // 3. this is a simple selection between N choices
    if (firstOr && firstOr.number && firstOr.maxNumber == null) {
      let children = expanded.filter((h) => h.parentId == firstOr!.id);
      let selectCount = creditToNumber(firstOr.number);

      // we find combinations either by selection or by credits
      let currentCombinations = combinations(
        children,
        selectCount,
        firstOr.number >= 10 ? firstOr.number : undefined
      );

      for (let combination of currentCombinations) {
        let newSequence: Sequence = {
          parent: currentSequence,
          items: combination.map((c) => ({
            ...c,
            parentId: firstOr!.parentId,
            replaces: firstOr!.id,
          })),
        };
        queue.push(newSequence);
      }
    }
    // // 2. this has minimum or maximum
    // else if (firstOr.maxNumber != null) {
    //   let parent = handbook.find((n) => n.id === firstOr.parentId);
    //   if (parent == null || !parent.number || parent.maxNumber != null) {
    //     throw new Error(
    //       "If you specify minimum or maximum, you need to specify exact number on the parent node"
    //     );
    //   }

    //   // if this has no maximum, maximum must be specified in the parent node
    //   if (firstOr.maxNumber == 0) {
    //     firstOr.maxNumber = parent.number;
    //   }
    // }
  }

  return result;
}

function findCollectionMaximum(
  id: number,
  collections: ClientHandbook[],
  level: number | null | undefined
) {
  let collection = collections.find((c) => c.id === id);
  if (collection == null) {
    throw new Error("Collection does not exist: " + id);
  }
  if (collection.collectionChildren == null) {
    throw new Error(
      "You need to pre-process collections with 'expandCollections' to know the exact number of children"
    );
  }
  if (collection.collectionChildren.some((c) => c.type === "folder")) {
    throw new Error(
      "The collection needs to be flat without any folder (OR, AND) nodes"
    );
  }
  if (!level) {
    return collection.collectionChildren.length || 0;
  }
  let subjectNodes = collection.collectionChildren.filter(
    (s) =>
      s.type === "subject" &&
      (s.level === level || s.subjectCode?.match(levelRegex[level]))
  );
  let nodes = collection.collectionChildren.filter(
    (s) => s.type === "link:program"
  );
  if (nodes.length) {
    return nodes.length + subjectNodes.length;
  }
  nodes = collection.collectionChildren.filter((s) => s.type === "link:major");
  if (nodes.length) {
    return nodes.length + subjectNodes.length;
  }
  nodes = collection.collectionChildren.filter((s) => s.type === "link:minor");
  if (nodes.length) {
    return nodes.length + subjectNodes.length;
  }
  return subjectNodes.length;
}

function clip(current: number, max: number | null | undefined) {
  if (!max) {
    return current;
  }
  return current < max ? current : max;
}

export function expandMinimumMaximum(
  sequence: Sequence,
  collections: ClientHandbook[]
): Sequence[] {
  let id = 100000;
  let handbook = sequence.items;
  let result: Sequence[] = [];

  // render sequence
  // this generates a full sequence with all nodes
  let expanded = expandSequence(sequence);

  // we consider or nodes only the ones with filter
  let orNodes = expanded.filter((c) => c.selection === "OR");

  // if we eliminated all the or nodes we are good to finish this one
  if (orNodes.length == 0) {
    return [];
  }

  // 1. extract nodes that have minimum or maximum
  let minMaxNodes = orNodes.filter(
    (o) => (o.maxNumber == 0 && !!o.number) || (!!o.maxNumber && o.number == 0)
  );
  if (minMaxNodes.length == 0) {
    return [];
  }

  // 2. extract their parents
  let minMaxParents = minMaxNodes.reduce((prev, next) => {
    if (prev.every((p) => p.id !== next.parentId)) {
      prev.push(handbook.find((h) => h.id === next.parentId)!);
    }
    return prev;
  }, [] as ClientHandbook[]);

  // 3. VALIDATE - minimum and maximum nodes musty specify total in the parent
  if (
    minMaxParents.some(
      (p) =>
        p.selection !== "OR" || p.type != "folder" || !p.number || !!p.maxNumber
    )
  ) {
    throw new Error(
      "Each node with minimum or maximum must have a parent node specifying exact number of selections"
    );
  }

  // 4. Process all children and create combinations
  let allCombinations: Array<{
    combinations: number[][];
    children: ClientHandbook[];
    parent: ClientHandbook;
  }> = [];

  for (let node of minMaxParents) {
    let children = handbook.filter((h) => h.parentId === node.id);
    let total = node.number!;

    let problem = children.map((c) => {
      // find how many children are there that are viable for the selection
      let currentMaximum =
        c.type === "link:program"
          ? clip(24, c.maxNumber)
          : c.type === "link:major"
          ? clip(8, c.maxNumber)
          : c.type === "link:minor"
          ? clip(4, c.maxNumber)
          : c.type === "link:collection"
          ? clip(
              findCollectionMaximum(c.reference!, collections, c.level),
              c.maxNumber
            )
          : clip(total, c.maxNumber);
      return {
        min: c.number || 0,
        max: currentMaximum,
      };
    });

    let combinations = processMinimumMaximum(problem, 0, total);
    allCombinations.push({ parent: node, children, combinations });
  }

  // with cartesian we create all possible combinations of min-max distributions
  let mixed = cartesian(allCombinations.map((c) => c.combinations));

  for (let mix of mixed) {
    let replacements: ClientHandbook[] = [];

    // i represents an index of the minMaxGroup
    for (let i = 0; i < mix.length; i++) {
      let group = allCombinations[i];

      // j is an index of a child in the combination group
      for (let j = 0; j < mix[i].length; j++) {
        let child = group.children[j];
        let quantity = mix[i][j];

        // now we add as many nodes
        for (let k = 0; k < quantity; k++) {
          let cid = id++;
          replacements.push({
            ...child,
            id: cid,
            nodeId: cid,
            number: 1,
            maxNumber: null,
            parentId: group.parent.parentId,
            replaces: group.parent.id,
          });
        }
      }
    }

    result.push({
      parent: sequence,
      items: replacements,
    });
  }

  return result;
}

export function processMinimumMaximum(
  problem: Array<{ min: number; max: number }>,
  current: number,
  total: number
): number[][] {
  let first = problem[0];
  let result: number[][] = [];

  for (let i = first.min; i <= first.max; i++) {
    if (problem.length == 1 && current + i == total) {
      result.push([i]);
      continue;
    }
    if (problem.length > 1) {
      let others = processMinimumMaximum(problem.slice(1), current + i, total);
      let c = others.map((o) => [i, ...o]);
      result.push(...c);
    }
  }
  return result;
}
