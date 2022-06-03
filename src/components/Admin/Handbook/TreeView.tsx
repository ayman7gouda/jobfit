import React, { useMemo, useState } from "react";

import {
  DndProvider,
  DragLayerMonitorProps,
  DropOptions,
  getBackendOptions,
  MultiBackend,
  NodeModel,
  Tree,
} from "@minoru/react-dnd-treeview";

import { toUrlName } from "lib/utils";
import Link from "next/link";
import { HiCheck } from "react-icons/hi";

import { CustomDragPreview } from "./CustomDragPreview";
import { CustomNode } from "./CustomNode";
import styles from "./EditableNodes.module.css";
import { Placeholder } from "./Placeholder";
import {
  ProgramsQuery,
  useProgramsQuery,
} from "./queries/programs.query.generated";
import {
  SpecialisationsQuery,
  useSpecialisationsQuery,
} from "./queries/specialisations.query.generated";
import { FileProperties, getGuid } from "./types";

type Option = { name: string; value: string };

type Model = {
  code: string;
  name: string;
  url: string;
  id: number;
  handbook: NodeModel<FileProperties>[];
};

function ProgramsView({
  selected,
  programs,
}: {
  selected: number;
  programs: ProgramsQuery["programs"];
}) {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <div className="flex my-2">
        <input
          type="text"
          placeholder="filter"
          onChange={(e) => setFilter(e.currentTarget.value)}
          className="flex-1 h-8"
        />
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
            className={"cursor-pointer px-2 py-1 flex items-center"}
            style={{
              background: selected && selected === p.id ? "silver" : "",
            }}
          >
            <Link
              href={`/admin/handbook/specialisations/${toUrlName(p.name)}?id=${
                p.id
              }`}
            >
              <a>
                {p.updated && (
                  <HiCheck className="mr-2" style={{ color: "green" }} />
                )}{" "}
                {p.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecialisationsView({
  selected,
  specialisations,
}: {
  selected: number | null;
  specialisations: SpecialisationsQuery["specialisations"];
}) {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <div className="flex my-2">
        <input
          type="text"
          placeholder="filter"
          onChange={(e) => setFilter(e.currentTarget.value)}
          className="flex-1 h-8"
        />
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
          <li key={i}>
            <Link
              href={`/admin/handbook/specialisations/${toUrlName(p.name)}?id=${
                p.id
              }`}
            >
              <a
                className={"cursor-pointer px-2 py-1 flex items-center"}
                style={{
                  background: selected && selected === p.id ? "silver" : "",
                }}
              >
                {p.updated && (
                  <HiCheck className="mr-2" style={{ color: "green" }} />
                )}{" "}
                {p.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Layout(args: {
  part: string;
  model?: Model;
  id?: number | null;
  save?(tree: NodeModel<FileProperties>[]): void;
}) {
  const [part, setPart] = useState(args.part);

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
        {part === "programs" && args.id ? (
          <ProgramsView selected={args.id} programs={programData.programs} />
        ) : (
          <SpecialisationsView
            selected={args.id!}
            specialisations={specialisationData.specialisations}
          />
        )}
      </div>
      <div style={{ flex: 1, height: "100%", overflow: "auto" }}>
        {args.id && args.model && args.save && (
          <TreeView
            defaultTree={args.model.handbook}
            model={args.model}
            all={all}
            programOptions={programOptions}
            majorOptions={majorOptions}
            save={args.save}
          />
        )}
      </div>
    </div>
  );
}

const TreeView = ({
  defaultTree,
  save,
  programOptions,
  majorOptions,
  all,
  model,
}: {
  defaultTree: NodeModel<FileProperties>[];
  save(tree: NodeModel<FileProperties>[]): void;
  programOptions: Option[];
  majorOptions: Option[];
  all: Option[];
  model: { name: string; id: number; url: string };
}) => {
  const [tree, setTree] = useState<NodeModel<FileProperties>[]>(defaultTree);

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

  return (
    <DndProvider
      backend={MultiBackend}
      debugMode={true}
      options={getBackendOptions()}
    >
      <div style={{ flex: 1, height: "100%", overflow: "auto" }}>
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
          <button
            type="button"
            className="ml-2 bg-slate-200 hover:bg-slate-300 px-4"
            onClick={() => {
              save(tree);
            }}
          >
            Save
          </button>
          <a
            href={`https://hbook.westernsydney.edu.au${model.url}`}
            target="__blank"
          >
            {model.name}
          </a>
        </div>

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
            key={model.id}
            initialOpen={true}
          />
        </div>
      </div>
    </DndProvider>
  );
};
