import { PrismaClient } from '@prisma/client';

import { HandbookErrorMessage, messages } from './errorMessages';
import { NodeFactory } from './nodes';

import type {
  ClientHandbook,
  Pathway,
  ProcessingState,
  ProgramResult,
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

  return validateProgramNodes(program.handbook as ClientHandbook[]);
}

function programResult(result: Partial<ProgramResult>): ProgramResult {
  return {
    pathways: [],
    message: undefined,
    ...result,
  };
}

function processNode(node: ClientHandbook) {}

export function generateSequence(handbook: ClientHandbook[]): ClientHandbook[] {
  if (!handbook || handbook.length == 0) {
    throw new Error(
      messages(HandbookErrorMessage.HandbookNotProcessed).message
    );
  }

  // find root node
  // if there is more than one root node we throw error
  let root = handbook.filter((h) => h.parentId === 0);
  if (root.length != 1) {
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

  let sequence: ClientHandbook[] = processNode(root);

  let parsed = handbook.map((h) => NodeFactory.create(h, handbook, externals));
  let parsedRoot = parsed.find((p) => p.node.parentId === 0)!;

  let currentPathway: Pathway = {
    credits: 0,
    pathwayCount: 1,
    sequence: [],
    name: root[0].text || "Root",
  };
  let state: ProcessingState = {
    currentPathway,
    pathways: [currentPathway],
  };

  parsedRoot.process(state);

  return programResult(state);
}

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
