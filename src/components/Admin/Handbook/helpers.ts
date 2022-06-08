import { ProgramInput, Selection } from 'generated/clientTypes';

import { ProgramQuery } from './queries/program.query.generated';
import { SpecialisationQuery } from './queries/specialisation.query.generated';
import { getGuid } from './shared';
import { NodeModel, NodeType, TreeNode } from './types';

export type Structure = Array<{
  name: string;
  subjects: Array<{ code: string; name: string }>;
}>;

export type Sequence = Array<{
  program: string;
  sequences: Array<{
    name: string;
    sequence: Array<{ code: string; name: string }>;
  }>;
}>;

export type Program = {
  url: string;
  code: string;
  name: string;
  structure: Structure;
  sequence: Sequence;
  clean: any;
};

function buildNodes(
  name: string,
  value: { structure: Structure; sequence: Sequence }
): NodeModel[] {
  const nodes = [];
  let parent = getGuid();
  nodes.push({
    id: parent,
    parent: 0,
    droppable: true,
    text: name,
    data: {},
  });

  if (value.structure) {
    for (let structure of value.structure) {
      if (structure.subjects.length) {
        let child = getGuid();

        nodes.push({
          id: child,
          parent: parent,
          droppable: true,
          text: "Structure: " + structure.name,
          data: {
            type: "folder" as NodeType,
            selection: Selection.And,
          },
        });

        for (let subject of structure.subjects) {
          nodes.push({
            id: getGuid(),
            parent: child,
            text: subject.code + " " + subject.name,
            data: {
              type: "subject" as NodeType,
            },
          });
        }
      }
    }
  }

  if (value.sequence && value.sequence.length) {
    for (let parentSequence of value.sequence) {
      let parentSequenceId = getGuid();
      nodes.push({
        id: parentSequenceId,
        parent: parent,
        droppable: true,
        text: parentSequence.program,
        data: {
          type: "folder" as NodeType,
          selection: Selection.And,
        },
      });

      for (let sequence of parentSequence.sequences) {
        let sequenceId = getGuid();
        nodes.push({
          id: sequenceId,
          parent: parentSequenceId,
          droppable: true,
          text: sequence.name ? "Sequence: " + sequence.name : "Sequence",
          data: {
            type: "folder" as NodeType,
            selection: Selection.And,
          },
        });

        for (let subject of sequence.sequence) {
          nodes.push({
            id: getGuid(),
            parent: sequenceId,
            text: subject.code + " " + subject.name,
            data: {},
          });
        }
      }
    }
  }

  return nodes;
}

export function daoInNode(selected: TreeNode): ProgramInput {
  return {
    id: selected.id,
    handbook: selected.handbook
      .filter((h) => !h.data.temp)
      .map((h, i) => ({
        id: h.data.dbId,
        nodeId: parseInt(h.id as string),
        parentId: parseInt(h.parent as string),
        text: h.text,
        folder: h.droppable,
        type: h.data.type,
        selection: h.data.selection,
        number: h.data.number,
        credits: h.data.credits,
        level: h.data.level,
        reference: h.data.reference,
        collection: h.data.collection,
        selector: h.data?.selector,
        flagged: h.data.flagged,
        index: i,
      })),
  };
}

export function daoOutNode(
  data:
    | NonNullable<ProgramQuery["program"]>
    | NonNullable<SpecialisationQuery["specialisation"]>
) {
  let handbook: NodeModel[];
  if (data.handbook && data.handbook.length) {
    handbook = data.handbook
      .map((h) => ({
        id: h.nodeId,
        parent: h.parentId as unknown as string,
        text: h.text || "",
        droppable: h.folder || false,
        index: h.index || 0,
        data: {
          dbId: h.id,
          type: h.folder && !h.type ? "folder" : (h.type! as NodeType),
          selection: h.folder && !h.selection ? Selection.And : h.selection!,
          credits: h.credits!,
          flagged: h.flagged!,
          level: h.level!,
          collection: h.collection!,
          number: h.number!,
          reference: h.reference!,
        },
      }))
      .sort((a, b) => (a.index < b.index ? -1 : 1));
    // handbook = handbook.filter((h, i) => handbook.)
  } else {
    let structure = JSON.parse(data.structureSource || "[]");
    let sequence = JSON.parse(data.sequenceSource || "[]");

    handbook = buildNodes(data.name, { structure, sequence });
  }

  return {
    code: data.code,
    name: data.name,
    url: data.url,
    id: data.id,
    handbook,
  };
}
