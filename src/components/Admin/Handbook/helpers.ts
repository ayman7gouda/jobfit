import { Handbook, NodeType, ProgramInput, Selection } from 'generated/clientTypes';

import { HandbookFragment } from './queries/handbook.fragment.generated';
import { ProgramQuery } from './queries/program.query.generated';
import { SpecialisationQuery } from './queries/specialisation.query.generated';
import { getGuid } from './shared';
import { NodeModel, TreeNode } from './types';

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
  const nodes: NodeModel[] = [];
  let parent = getGuid();
  let idx = 0;

  nodes.push({
    id: parent,
    parent: 0,
    index: idx++,
    droppable: true,
    text: name,
    data: {
      selection: "AND",
      type: "Folder",
    },
  });

  if (value.structure) {
    for (let structure of value.structure) {
      if (structure.subjects.length) {
        let child = getGuid();

        nodes.push({
          id: child,
          parent: parent,
          droppable: true,
          index: idx++,
          text: "Structure: " + structure.name,
          data: {
            type: "Folder",
            selection: "AND" as Selection,
          },
        });

        for (let subject of structure.subjects) {
          let code = extractCode(subject.code);
          let subjectCode = code ? code : subject.code;
          nodes.push({
            id: getGuid(),
            parent: child,
            index: idx++,
            text: subjectCode + " " + subject.name,
            data: {
              type: "Subject",
              subjectCode: subjectCode!,
              subjectName: subject.name,
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
        index: idx++,
        text: parentSequence.program,
        data: {
          type: "Folder" as NodeType,
          selection: "AND" as Selection,
        },
      });

      for (let sequence of parentSequence.sequences) {
        let sequenceId = getGuid();
        nodes.push({
          id: sequenceId,
          parent: parentSequenceId,
          droppable: true,
          index: idx++,
          text: sequence.name ? "Sequence: " + sequence.name : "Sequence",
          data: {
            type: "Folder" as NodeType,
            selection: "AND" as Selection,
          },
        });

        for (let subject of sequence.sequence) {
          let code = extractCode(subject.code);
          let subjectCode = code ? code : subject.code;

          nodes.push({
            id: getGuid(),
            parent: sequenceId,
            index: idx++,
            text: subjectCode + " " + subject.name,
            data: {
              type: "Subject" as NodeType,
              subjectCode: subjectCode!,
              subjectName: subject.name,
            },
          });
        }
      }
    }
  }

  return nodes;
}

export function extractCode(text: string) {
  let match = text.match(/^[A-Z]{4}\s\d{4}/);
  if (match) {
    return match[0].replace(/\s/g, "");
  }
  match = text.match(/^[A-Z]{4}\d{4}/);
  if (match) {
    return match[0];
  }
  return null;
}

function parseSubjectCode(selected: Handbook) {
  if (selected.subjectCode) {
    return selected.subjectCode;
  }
  if (
    selected.folder ||
    (!!selected.type && selected.type !== "Subject") ||
    !selected.text
  ) {
    return null;
  }
  return extractCode(selected.text);
}

export function extractName(text: string) {
  let match = text.match(/^[A-Z]{4}\s\d{4}\s(.*)/);
  if (match) {
    return match[1];
  }
  match = text.match(/^[A-Z]{4}\d{4}\s(.*)/);
  if (match) {
    return match[1];
  }
  return null;
}

function parseSubjectName(selected: Handbook) {
  if (selected.subjectName) {
    return selected.subjectName;
  }
  if (
    selected.folder ||
    (!!selected.type && selected.type !== "Subject") ||
    !selected.text
  ) {
    return null;
  }
  return extractName(selected.text);
}

export function daoInNode(selected: TreeNode): ProgramInput {
  return {
    id: selected.id,
    handbook: selected.handbook
      .filter((h) => !h.data.temp)
      .map((h, i) => ({
        id: h.data.dbId, // replaceId ? h.data.dbId : h.id,
        nodeId: h.id,
        parentId: parseInt(h.parent as string),
        text: h.data.type === "Subject" && h.data.subjectCode ? "" : h.text,
        folder: h.droppable,
        type: h.data.type,
        selection: h.data.selection,
        number: h.data.number,
        maxNumber: h.data.maxNumber,
        credits: h.data.credits,
        level: h.data.level || null,
        reference: h.data.reference,
        collection: h.data.collection,
        selector: h.data.selector,
        flagged: h.data.flagged,
        subjectCode: h.data.type === "Subject" ? h.data.subjectCode : null,
        subjectName: h.data.type === "Subject" ? h.data.subjectName : null,
        index: i,
      })),
  };
}

export function nodeToTree(h: Handbook, j: number) {
  let subjectCode = parseSubjectCode(h)!;
  let subjectName = parseSubjectName(h)!;

  return {
    id: h.nodeId,
    parent: h.parentId as unknown as string,
    text: subjectCode ? `${subjectCode} ${subjectName}` : h.text || "",
    droppable: h.folder || false,
    index: h.index || j,
    data: {
      dbId: h.id,
      type:
        h.folder && !h.type
          ? "Folder"
          : !h.folder && !h.type
          ? "Subject"
          : (h.type! as NodeType),
      selection: h.folder && !h.selection ? "AND" : h.selection!,
      selector: h.selector!,
      credits: h.credits!,
      flagged: h.flagged!,
      level: h.level!,
      number: h.number!,
      maxNumber: h.maxNumber!,
      reference: h.reference!,
      subjectCode,
      subjectName,
    },
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
      .map((h, j) => nodeToTree(h, j))
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

export function trimResults(hb: Handbook[][]) {
  return hb.map((c) =>
    c.map((d) => {
      let clone = { ...d };
      delete clone.__typename;
      return clone as HandbookFragment;
    })
  );
}
