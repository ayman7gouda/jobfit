import { Handbook } from '@prisma/client';

import { NodeType } from 'generated/clientTypes';

import { ClientHandbook } from './types';

// import { expandSequence } from './validator';

const defaultHandbookNode: Handbook = {
  id: 0,
  nodeId: 0,
  programId: null,
  specialisationId: null,
  parentId: null,
  text: null,
  folder: null,
  type: null,
  selection: null,
  number: null,
  maxNumber: null,
  credits: null,
  level: null,
  reference: null,
  collection: null,
  selector: null,
  flagged: null,
  index: null,
  subjectCode: null,
  subjectName: null,
};

type HandbookTree = Partial<ClientHandbook> & { children?: HandbookTree[] };

let nodeId = 1000;

export function hb(hb: Partial<Handbook> & { type: NodeType }): ClientHandbook {
  return {
    ...defaultHandbookNode,
    id: nodeId++,
    ...hb,
  };
}

// export function simplifySequence(sequence: Sequence) {
//   return expandSequence(sequence).map((r) => {
//     let result: any = {};
//     if (r.text) {
//       result.text = r.text;
//     }
//     if (r.subjectCode) {
//       result.code = r.subjectCode;
//     }
//     if (r.subjectName) {
//       result.name = r.subjectName;
//     }
//     return result;
//   });
// }

export function createStructure(
  nodes: HandbookTree | HandbookTree[],
  parentId: number = 0
): ClientHandbook[] {
  let result: ClientHandbook[] = [];

  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  } else {
    parentId = -1;

    // create temporary parent node
    result.push(
      hb({
        id: parentId,
        parentId: 0,
        text: "#root",
        type: "Folder" as NodeType,
        selection: "AND",
      })
    );
  }

  for (let node of nodes) {
    if (node.type == null) {
      if (node.children) {
        node.type = "Folder";
        node.folder = true;
      } else {
        node.type = "Subject";
      }
    }

    let { children, ...rest } = node;
    let newNode = hb(rest as ClientHandbook);
    newNode.parentId = parentId;
    result.push(newNode);

    if (children) {
      for (let child of children) {
        let childNodes = createStructure(child, newNode.id);
        result = result.concat(childNodes);
      }
    }
  }

  return result;
}
