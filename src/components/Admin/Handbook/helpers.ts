import { NodeModel } from "@minoru/react-dnd-treeview";

import { ProgramInput } from "generated/clientTypes";

import { ProgramQuery } from "./queries/program.query.generated";
import { SpecialisationQuery } from "./queries/specialisation.query.generated";
import { FileProperties, getGuid, TreeNode } from "./types";

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
) {
  const nodes = [];
  let parent = getGuid();
  nodes.push({
    id: parent,
    parent: 0,
    droppable: true,
    text: name,
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
        });

        for (let subject of structure.subjects) {
          nodes.push({
            id: getGuid(),
            parent: child,
            text: subject.code + " " + subject.name,
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
          type: "",
        },
      });

      for (let sequence of parentSequence.sequences) {
        let sequenceId = getGuid();
        nodes.push({
          id: sequenceId,
          parent: parentSequenceId,
          droppable: true,
          text: sequence.name || "Sequence",
          data: {
            type: "",
          },
        });

        for (let subject of sequence.sequence) {
          nodes.push({
            id: getGuid(),
            parent: sequenceId,
            text: subject.code + " " + subject.name,
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
    handbook: selected.handbook.map((h) => ({
      id: h.data?.dbId,
      nodeId: parseInt(h.id as string),
      credits:
        h.data?.credits != null && h.data?.credits != ""
          ? parseInt(h.data!.credits)
          : undefined,
      flagged: h.data?.flagged,
      folder: h.droppable,
      level:
        h.data?.level != null && h.data.level != ""
          ? parseInt(h.data.level)
          : undefined,
      number:
        h.data?.number != null && h.data.number != ""
          ? parseInt(h.data.number)
          : undefined,
      reference:
        h.data?.reference != null && h.data!.reference != ""
          ? parseInt(h.data!.reference)
          : undefined,
      parentId: parseInt(h.parent as string),
      text: h.text,
      type: h.data?.type,
    })),
  };
}

export function daoOutNode(
  data:
    | NonNullable<ProgramQuery["program"]>
    | NonNullable<SpecialisationQuery["specialisation"]>
) {
  let handbook: NodeModel<FileProperties>[];
  if (data.handbook && data.handbook.length) {
    handbook = data.handbook.map((h) => ({
      id: h.nodeId,
      parent: h.parentId as unknown as string,
      text: h.text || "",
      droppable: h.folder || false,
      data: {
        dbId: h.id,
        type: h.type!,
        credits: (h.credits || "") as string,
        flagged: h.flagged!,
        level: (h.level || "") as string,
        number: (h.number || "") as string,
        reference: (h.reference || "") as string,
      },
    }));
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
