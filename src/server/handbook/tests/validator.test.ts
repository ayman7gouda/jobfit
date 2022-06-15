import { expect } from 'expect';

import { Handbook } from '@prisma/client';

import { NodeType } from 'components/Admin/Handbook/types';

import { HandbookErrorMessage } from '../errorMessages';
import { FolderNode } from '../FolderNode';
import { NodeFactory } from '../nodes';
import { ClientHandbook } from '../types';
import { validateProgram, validateProgramNodes } from '../validator';

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

function hb(hb: Partial<Handbook> & { type: NodeType }): ClientHandbook {
  return {
    ...defaultHandbookNode,
    id: nodeId++,
    ...hb,
  };
}

function createStructure(
  node: HandbookTree,
  parentId: number = 0
): ClientHandbook[] {
  let nodes: ClientHandbook[] = [];
  if (node.type == null) {
    if (node.children) {
      node.type = "folder";
    } else {
      node.type = "subject";
    }
  }
  let newNode = hb(node as ClientHandbook);
  newNode.parentId = parentId;
  nodes.push(newNode);

  if (node.children) {
    for (let child of node.children) {
      let childNodes = createStructure(child, newNode.id);
      nodes = nodes.concat(childNodes);
    }
  }
  return nodes;
}

describe("Program Validator", function () {
  beforeEach(function () {
    NodeFactory.init();
  });

  it("has to use prisma client", async function () {
    await expect(() => validateProgram(1, undefined as any)).rejects.toThrow(
      "Client not specified!"
    );
  });

  it("throws if id does not exist", async function () {
    await expect(() =>
      validateProgram(1, (global as any).prisma)
    ).rejects.toThrow("Program does not exist");
  });

  it("can only process processed handbook entries", async function () {
    let result = await validateProgramNodes(undefined);
    expect(result!.message!.code).toEqual(
      HandbookErrorMessage.HandbookNotProcessed
    );

    result = await validateProgramNodes([]);
    expect(result!.message!.code).toEqual(
      HandbookErrorMessage.HandbookNotProcessed
    );
  });

  it("handbook must have one root node", async function () {
    let result = await validateProgramNodes([hb({ type: "folder" })]);
    expect(result!.message!.code).toEqual(
      HandbookErrorMessage.CompulsoryRootNode
    );

    result = await validateProgramNodes([
      hb({ parentId: 0, type: "folder", selection: "AND" }),
      hb({ parentId: 0, type: "folder", selection: "AND" }),
    ]);
    expect(result!.message!.code).toEqual(
      HandbookErrorMessage.CompulsoryRootNode
    );

    result = await validateProgramNodes([
      hb({ id: 1, parentId: 0, type: "folder", selection: "AND" }),
    ]);
    expect(result!.message).toBeUndefined();
  });

  it("folder node must contain selection", function () {
    expect(
      () =>
        new FolderNode(
          {
            id: 0,
            type: "folder",
          } as any,
          []
        )
    ).toThrow('Folder node must have selection "AND" or "OR"');
  });

  it("subject node adds credits to the pathway", async function () {
    let result = await validateProgramNodes([
      hb({
        type: "subject",
        parentId: 4,
        subjectCode: "3",
        subjectName: "Name 3",
        index: 1,
      }),
      hb({
        type: "folder",
        folder: true,
        id: 3,
        parentId: 1,
        selection: "AND",
        text: "Autumn",
        index: 2,
      }),
      hb({
        type: "folder",
        folder: true,
        id: 1,
        parentId: 0,
        selection: "AND",
        text: "Year 1",
        index: 3,
      }),
      hb({
        type: "folder",
        folder: true,
        id: 4,
        parentId: 1,
        selection: "AND",
        text: "Spring",
        index: 4,
      }),
      hb({
        type: "subject",
        parentId: 3,
        subjectCode: "2",
        subjectName: "Name 2",
        index: 5,
      }),
      hb({
        type: "subject",
        parentId: 1,
        subjectCode: "1",
        subjectName: "Name 1",
        index: 6,
      }),
    ]);
    expect(result.pathways).toHaveLength(1);
    expect(result.pathways[0].credits).toBe(30);
    expect(result.pathways[0].sequence).toEqual([
      { text: "Year 1" },
      { text: "Autumn" },
      { code: "2", name: "Name 2", credits: 10 },
      { text: "Spring" },
      { code: "3", name: "Name 3", credits: 10 },
      { code: "1", name: "Name 1", credits: 10 },
    ]);
  });

  it("OR node allows to select a subset of nodes, generating new pathways", async function () {
    let nodes = createStructure({
      text: "Year",
      selection: "AND",
      children: [
        {
          selection: "OR",
          number: 2,
          children: [
            { subjectCode: "1", type: "subject" },
            { subjectCode: "2", type: "subject" },
            { subjectCode: "3", type: "subject" },
          ],
        },
      ],
    });
    let result = await validateProgramNodes(nodes);
    expect(result.pathways).toHaveLength(3);
    expect(result.pathways[0].credits).toBe(20);
    expect(result.pathways[1].credits).toBe(20);
    expect(result.pathways[2].credits).toBe(20);

    expect(result.pathways[0].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "1", name: null, credits: 10 },
      { code: "2", name: null, credits: 10 },
    ]);

    expect(result.pathways[1].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "1", name: null, credits: 10 },
      { code: "3", name: null, credits: 10 },
    ]);

    expect(result.pathways[2].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "2", name: null, credits: 10 },
      { code: "3", name: null, credits: 10 },
    ]);
  });

  it("OR node allows to select a subset of nodes by number of credits, generating new pathways", async function () {
    let nodes = createStructure({
      text: "Year",
      selection: "AND",
      children: [
        {
          selection: "OR",
          number: 20,
          children: [
            { subjectCode: "1", type: "subject" },
            { subjectCode: "2", type: "subject" },
            { subjectCode: "3", type: "subject" },
          ],
        },
      ],
    });
    let result = await validateProgramNodes(nodes);
    expect(result.pathways).toHaveLength(3);
    expect(result.pathways[0].credits).toBe(20);
    expect(result.pathways[1].credits).toBe(20);
    expect(result.pathways[2].credits).toBe(20);

    expect(result.pathways[0].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "1", name: null, credits: 10 },
      { code: "2", name: null, credits: 10 },
    ]);

    expect(result.pathways[1].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "1", name: null, credits: 10 },
      { code: "3", name: null, credits: 10 },
    ]);

    expect(result.pathways[2].sequence).toEqual([
      { text: "Year" },
      { text: null },
      { code: "2", name: null, credits: 10 },
      { code: "3", name: null, credits: 10 },
    ]);
  });

  it("Collection nodes are not processed", async function () {
    let nodes = createStructure({
      text: "Year",
      selection: "AND",
      children: [
        {
          type: "collection",
          selection: "OR",
          number: 1,
          children: [{ subjectCode: "1", type: "subject" }],
        },
      ],
    });
    let result = await validateProgramNodes(nodes);
    expect(result.pathways[0].sequence).toEqual([{ text: "Year" }]);
  });
});
