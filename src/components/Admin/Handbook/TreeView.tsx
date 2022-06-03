import React, { useMemo, useState } from "react";

import {
  DragLayerMonitorProps,
  DropOptions,
  NodeModel,
  Tree,
} from "@minoru/react-dnd-treeview";

import { ProgramInput } from "generated/clientTypes";
import { HiCheck } from "react-icons/hi";

import { CustomDragPreview } from "./CustomDragPreview";
import { CustomNode } from "./CustomNode";
import styles from "./EditableNodes.module.css";
import { Placeholder } from "./Placeholder";
import {
  ProgramQuery,
  useProgramLazyQuery,
} from "./queries/program.query.generated";
import {
  ProgramsQuery,
  useProgramsQuery,
} from "./queries/programs.query.generated";
import { useSaveProgramHandbookMutation } from "./queries/saveProgramHandbook.mutation.generated";
import { useSaveSpecialisationHandbookMutation } from "./queries/saveSpecialisationHandbook.mutation.generated";
import {
  SpecialisationQuery,
  useSpecialisationLazyQuery,
} from "./queries/specialisation.query.generated";
import {
  SpecialisationsQuery,
  useSpecialisationsQuery,
} from "./queries/specialisations.query.generated";
import { FileProperties, getGuid, initGuid, TreeNode } from "./types";

type ProgramNode = {
  p: string;
  content: Program;
};

type Structure = Array<{
  name: string;
  subjects: Array<{ code: string; name: string }>;
}>;

type Sequence = Array<{
  program: string;
  sequences: Array<{
    name: string;
    sequence: Array<{ code: string; name: string }>;
  }>;
}>;

type Program = {
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
          type: "and",
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
            type: "and",
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

function daoInNode(selected: TreeNode): ProgramInput {
  return {
    id: selected.id,
    handbook: selected.handbook.map((h) => ({
      id: h.data?.dbId,
      nodeId: parseInt(h.id as string),
      credits:
        h.data?.credits != null && h.data?.credits != ""
          ? parseInt(h.data.credits)
          : undefined,
      flagged: h.data?.flagged,
      folder: h.droppable,
      level:
        h.data?.level != null && h.data?.level != ""
          ? parseInt(h.data.level)
          : undefined,
      number:
        h.data?.number != null && h.data?.number != ""
          ? parseInt(h.data.number)
          : undefined,
      parentId: parseInt(h.parent as string),
      text: h.text,
      type: h.data?.type,
    })),
  };
}

function daoOutNode(
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
      },
    }));
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

function ProgramsView({
  setSelected,
  selected,
  programs,
  id,
}: {
  setSelected(node: TreeNode): void;
  selected: TreeNode | null;
  programs: ProgramsQuery["programs"];
  id: string;
}) {
  const [filter, setFilter] = useState("");

  const [saveProgram] = useSaveProgramHandbookMutation();
  const [loadProgram] = useProgramLazyQuery();

  return (
    <div>
      <div className="flex my-2">
        <input
          type="text"
          placeholder="filter"
          onChange={(e) => setFilter(e.currentTarget.value)}
          className="flex-1 h-8"
        />
        <button
          type="button"
          className="ml-2 bg-slate-200 hover:bg-slate-300 px-4"
          onClick={() => {
            if (!selected) {
              return;
            }
            saveProgram({
              variables: {
                input: daoInNode(selected),
              },
            });
          }}
        >
          Save
        </button>
      </div>

      <ul>
        {(filter
          ? programs.filter(
              (p) =>
                p.code.indexOf(filter) != -1 ||
                p.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
            )
          : programs
        ).map((p, i) => (
          <li
            key={i}
            onClick={() => {
              loadProgram({
                variables: {
                  id: p.id,
                },
              }).then(({ data }) => {
                if (data && data.program) {
                  setSelected(daoOutNode(data.program));
                }
              });
            }}
            className={"cursor-pointer px-2 py-1 flex items-center"}
            style={{
              background: selected && selected.code === p.code ? "silver" : "",
            }}
          >
            {p.updated && (
              <HiCheck className="mr-2" style={{ color: "green" }} />
            )}{" "}
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecialisationsView({
  setSelected,
  selected,
  specialisations,
  id,
}: {
  setSelected(node: TreeNode): void;
  selected: TreeNode | null;
  specialisations: SpecialisationsQuery["specialisations"];
  id: string;
}) {
  const [filter, setFilter] = useState("");

  const [save] = useSaveSpecialisationHandbookMutation();
  const [load] = useSpecialisationLazyQuery();

  return (
    <div>
      <div className="flex my-2">
        <input
          type="text"
          placeholder="filter"
          onChange={(e) => setFilter(e.currentTarget.value)}
          className="flex-1 h-8"
        />
        <button
          type="button"
          className="ml-2 bg-slate-200 hover:bg-slate-300 px-4"
          onClick={() => {
            if (!selected) {
              return;
            }
            save({
              variables: {
                input: daoInNode(selected),
              },
            });
          }}
        >
          Save
        </button>
      </div>

      <ul>
        {(filter
          ? specialisations.filter(
              (p) =>
                p.code.indexOf(filter) != -1 ||
                p.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
            )
          : specialisations
        ).map((p, i) => (
          <li
            key={i}
            onClick={() => {
              load({
                variables: {
                  id: p.id,
                },
              }).then(({ data }) => {
                if (data && data.specialisation) {
                  setSelected(daoOutNode(data.specialisation));
                }
              });
            }}
            className={"cursor-pointer px-2 py-1 flex items-center"}
            style={{
              background: selected && selected.code === p.code ? "silver" : "",
            }}
          >
            {p.updated && (
              <HiCheck className="mr-2" style={{ color: "green" }} />
            )}{" "}
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const TreeView = (args: {
  specialisationId?: string;
  programId?: string;
}) => {
  const [part, setPart] = useState(
    args.specialisationId ? "majors" : "programs"
  );
  const [tree, setTree] = useState<NodeModel<FileProperties>[]>([]);
  const [selected, setSelected] = useState<TreeNode | null>(null);

  const { data: programData, loading: loadingPrograms } = useProgramsQuery();
  const { data: specialisationData, loading: loadingSpecialisations } =
    useSpecialisationsQuery();

  const programOptions = useMemo(() => {
    if (!programData?.programs) {
      return [];
    }
    return [...programData.programs]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p, i) => ({
        name: `${p.name} [${p.code}]`,
        value: p.code,
      }));
  }, [programData?.programs]);

  const majorOptions = useMemo(() => {
    if (!specialisationData?.specialisations) {
      return [];
    }
    return [{ name: "Nothing", value: "" }].concat(
      [...specialisationData.specialisations]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((p, i) => ({
          name: `${p.name} [${p.code}]`,
          value: p.code,
        }))
    );
  }, [specialisationData?.specialisations]);

  const all = useMemo(() => {
    return [...programOptions, ...majorOptions].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [programOptions, majorOptions]);

  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    // args.onDrop(newTree, options);
    setTree(newTree);
  };

  const handleTextChange = (id: NodeModel["id"], value: string) => {
    const newTree = tree.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    setTree(newTree);
  };

  function clone(id: NodeModel["id"]) {
    const node = tree.find((t) => t.id === id);
    const clone = JSON.parse(JSON.stringify(node));
    clone.id = getGuid();
    const newTree = [...tree, clone];

    setTree(newTree);
  }

  if (
    loadingPrograms ||
    loadingSpecialisations ||
    !programData ||
    !specialisationData
  ) {
    return <div>Loading ...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100%", alignItems: "stretch" }}>
      <div
        style={{
          width: 500,
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          padding: 16,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="flex gap-1">
          <div
            className="cursor-pointer p-1 flex-1"
            style={{
              background: part == "programs" ? "lightBlue" : "lightGrey",
            }}
            onClick={() => setPart("programs")}
          >
            Programs
          </div>
          <div
            className="cursor-pointer p-1 flex-1"
            style={{
              background: part == "majors" ? "lightBlue" : "lightGrey",
            }}
            onClick={() => setPart("majors")}
          >
            Majors
          </div>
        </div>

        {/* Tree View */}
        {part === "programs" ? (
          <ProgramsView
            id={args.programId}
            selected={selected}
            setSelected={(p) => {
              setSelected(p);
              initGuid(p);
              setTree(p.handbook);
            }}
            programs={programData.programs}
          />
        ) : (
          <SpecialisationsView
            id={args.specialisationId}
            selected={selected}
            setSelected={(p) => {
              setSelected(p);
              initGuid(p);
              setTree(p.handbook);
            }}
            specialisations={specialisationData.specialisations}
          />
        )}
      </div>
      <div style={{ flex: 1, height: "100%", overflow: "auto" }}>
        {selected && (
          <div
            style={{
              padding: 8,
              display: "flex",
              alignItems: "center",
              position: "sticky",
              top: 0,
              background: "white",
              width: "100%",
              zIndex: 1,
            }}
          >
            <a
              href={`https://hbook.westernsydney.edu.au${selected.url}`}
              target="__blank"
            >
              {selected.name}
            </a>
          </div>
        )}
        <div style={{ paddingTop: 20 }}>
          <Tree
            tree={tree}
            rootId={0}
            render={(
              node: NodeModel<FileProperties>,
              { depth, isOpen, onToggle }
            ) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                programs={programOptions}
                majors={majorOptions}
                all={all}
                onTextChange={handleTextChange}
                clone={clone}
                tree={tree}
                onAddNode={(node) => setTree(tree.concat(node))}
                onDeleteNode={(id) => {
                  setTree(tree.filter((n) => n.id !== id && n.parent !== id));
                }}
                onNodeChange={(id, value) => {
                  const { text, ...rest } = value;
                  const newTree = tree.map((node) => {
                    if (node.id === id) {
                      return {
                        ...node,
                        // text: text || node.text,
                        data: {
                          ...node.data,
                          ...(rest as any),
                        },
                      };
                    }

                    return node;
                  });

                  setTree(newTree);
                }}
              />
            )}
            dragPreviewRender={(
              monitorProps: DragLayerMonitorProps<FileProperties>
            ) => <CustomDragPreview monitorProps={monitorProps} />}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              placeholder: styles.placeholderContainer,
            }}
            sort={false}
            insertDroppableFirst={false}
            canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
              if (dragSource?.parent === dropTargetId) {
                return true;
              }
            }}
            dropTargetOffset={5}
            placeholderRender={(node, { depth }) => (
              <Placeholder node={node} depth={depth} />
            )}
            key={selected ? selected.code : ""}
            initialOpen={true}
          />
        </div>
      </div>
    </div>
  );
};
