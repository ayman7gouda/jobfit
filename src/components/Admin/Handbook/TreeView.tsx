import React, { useMemo, useState } from 'react';
import SelectSearch from 'react-select-search';

import { useApolloClient } from '@apollo/client';
import { DragLayerMonitorProps, DropOptions, Tree } from '@minoru/react-dnd-treeview';

import { toUrlName } from 'lib/utils';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { HiCheck, HiChevronLeft, HiChevronRight, HiDownload, HiSave } from 'react-icons/hi';

// import "react-select-search/style.css";
import { CustomDragPreview } from './CustomDragPreview';
import { CustomNode } from './CustomNode';
import styles from './EditableNodes.module.css';
import { daoOutNode } from './helpers';
import { valueFilter } from './LinkNode';
import { Placeholder } from './Placeholder';
import { ProgramDocument } from './queries/program.query.generated';
import { ProgramsQuery, useProgramsQuery } from './queries/programs.query.generated';
import { SpecialisationDocument } from './queries/specialisation.query.generated';
import {
  SpecialisationsQuery, useSpecialisationsQuery
} from './queries/specialisations.query.generated';
import { getGuid, Select } from './shared';
import { FileProperties, NodeModel, Option } from './types';

type Model = {
  code: string;
  name: string;
  url: string;
  id: number;
  handbook: NodeModel[];
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
              href={`/admin/handbook/programs/${toUrlName(p.name)}?id=${p.id}`}
            >
              <a className="flex items-center">
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
  id?: number | null;
  treeView?(args: {
    all: Option[];
    minorOptions: Option[];
    programOptions: Option[];
    majorOptions: Option[];
  }): any;
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
        value: p.id,
      }));
  }, [programData?.programs]);

  const majorOptions = useMemo(() => {
    if (!specialisationData?.specialisations) {
      return [];
    }
    return [...specialisationData.specialisations]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p, i) => ({
        name: `${p.name} [${p.code}]`,
        value: p.id,
      }))
      .filter((f) => f.name.indexOf("Major") >= 0);
  }, [specialisationData?.specialisations]);

  const minorOptions = useMemo(() => {
    if (!specialisationData?.specialisations) {
      return [];
    }
    return [...specialisationData.specialisations]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p, i) => ({
        name: `${p.name} [${p.code}]`,
        value: p.id,
      }))
      .filter((f) => f.name.indexOf("Minor") >= 0);
  }, [specialisationData?.specialisations]);

  const all = useMemo(() => {
    let filtered = [...programOptions, ...majorOptions, ...minorOptions].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    filtered = filtered.filter(
      (f, i) => filtered.findIndex((h) => h.value === f.value) === i
    );
    return filtered;
  }, [programOptions, majorOptions, minorOptions]);

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
        {args.id &&
          args.treeView &&
          args.treeView({ programOptions, majorOptions, minorOptions, all })}
      </div>
    </div>
  );
}

type UndoNode = {
  previous?: UndoNode;
  next?: UndoNode;
  content: NodeModel[];
};

function Import(
  props: TreeViewProps & { tree: NodeModel[]; setTree(tree: NodeModel[]): void }
) {
  const [value, setValue] = useState("");
  const [collection, setCollection] = useState<NodeModel | null>(null);
  const [program, setProgram] = useState<Option | null>(null);
  const [programNodes, setProgramNodes] = useState([] as NodeModel[]);
  const client = useApolloClient();

  return (
    <div className="bg-slate-100 px-4 py-1 rounded-lg mx-4 flex items-center">
      Import:
      <SelectSearch
        options={props.all}
        value={value}
        onChange={(e) => {
          if (!e) {
            return;
          }

          let id = e as unknown as string;
          let numId = parseInt(id);
          let program = props.all.find((p) => p.value == numId)!;
          let query =
            program.name.indexOf("Major") > 0 ||
            program.name.indexOf("Minor") > 0
              ? SpecialisationDocument
              : ProgramDocument;
          let queryName =
            program.name.indexOf("Major") > 0 ||
            program.name.indexOf("Minor") > 0
              ? "specialisation"
              : "program";

          setProgram(program);
          setValue(id);

          client
            .query({ query, variables: { id: numId } })
            .then((result: any) => {
              let data = result.data[queryName];
              if (data) {
                const nodes = daoOutNode(data);
                setProgramNodes(nodes.handbook);
              }
            });
        }}
        search
        filterOptions={valueFilter}
        placeholder="Select the program"
      />
      <Select
        value={(collection?.id as any) || ""}
        style={{ minWidth: 120 }}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          let id = parseInt(e.currentTarget.value);
          let spc = programNodes.find((p) => p.id == id);
          setCollection(spc!);
        }}
      >
        <option value="">Please Select</option>
        {programNodes
          .filter((n) => n.data.type === "collection")
          .map((p) => (
            <option key={p.id} value={p.id}>
              {p.text}
            </option>
          ))}
      </Select>
      <button
        type="button"
        className="ml-2 mr-2 py-2 rounded-lg bg-blue-200 hover:bg-blue-300 px-4 flex items-center"
        onClick={() => {
          // save(tree);
          if (collection) {
            // find parent
            let first = props.tree[0];
            while (first.parent && first.parent != 0) {
              first = props.tree.find((t) => t.id === first.parent)!;
            }

            let nodes = cloneNode(programNodes, collection!.id, first.id);
            props.setTree(props.tree.concat(nodes));
          }
        }}
      >
        <HiDownload className="mr-2" /> Import
      </button>
    </div>
  );
}

type TreeViewProps = {
  defaultTree: NodeModel[];
  save(tree: NodeModel[]): void;
  saving: boolean;
  programOptions: Option[];
  majorOptions: Option[];
  minorOptions: Option[];
  all: Option[];
  model: { name: string; id: number; url: string };
};

function cloneNode(
  tree: NodeModel[],
  id: NodeModel["id"],
  parentId?: number
): NodeModel[] {
  const node = tree.find((t) => t.id === id);

  if (!parentId) {
    parentId = node?.parent as number;
  }

  let nodes = [];

  let clone = JSON.parse(JSON.stringify(node));
  clone.id = getGuid();
  clone.parent = parentId;
  clone.data.dbId = undefined;
  nodes.push(clone);

  let childNodes = tree.filter((t) => t.parent === id);
  for (let node of childNodes) {
    nodes.push(...cloneNode(tree, node.id, clone.id));
  }

  return nodes;
}

export const TreeView = (props: TreeViewProps) => {
  const {
    defaultTree,
    save,
    saving,
    programOptions,
    majorOptions,
    minorOptions,
    all,
    model,
  } = props;
  const [showImport, toggleImport] = useState(false);
  const [tree, setCurrentTree] = useState<NodeModel[]>(defaultTree);
  const [undoQueue, setUndoQueue] = useState<UndoNode>({
    previous: undefined,
    content: defaultTree,
    next: undefined,
  });

  const addUndoNode = useMemo(() => {
    return debounce((tree) => {
      let current: UndoNode = {
        previous: undoQueue,
        next: undefined,
        content: tree,
      };
      undoQueue.next = current;
      setUndoQueue(current);
    }, 500);
  }, [undoQueue]);

  function setTree(tree: NodeModel[]) {
    addUndoNode(tree);
    setCurrentTree(tree);
  }

  function clone(id: NodeModel["id"]) {
    const newTree = tree.concat(cloneNode(tree, id));
    setTree(newTree);
  }

  const handleDrop = (newTree: any[], options: DropOptions<FileProperties>) => {
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

  return (
    <div
      style={{ flex: 1, height: "100%", overflow: "auto", paddingBottom: 140 }}
    >
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
          className="ml-2 mr-2 py-2 rounded-lg bg-blue-200 hover:bg-blue-300 px-4 flex items-center"
          onClick={() => {
            save(tree);
          }}
        >
          <HiSave className="mr-2" />
          {saving ? "Saving ..." : "Save"}
        </button>

        <button
          type="button"
          className={`ml-h mr-h py-2 rounded-lg h-10 ${
            showImport ? "bg-blue-300" : "bg-blue-200"
          } hover:bg-blue-400 px-4 flex items-center`}
          onClick={() => {
            toggleImport(!showImport);
          }}
        >
          <HiDownload />
        </button>

        <button
          type="button"
          disabled={!undoQueue.previous}
          className="ml-2 py-2 rounded-l-lg rounded-r-none disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 px-4 flex items-center"
          onClick={() => {
            if (undoQueue.previous) {
              setUndoQueue(undoQueue.previous);
              setCurrentTree(undoQueue.previous.content);
            }
          }}
        >
          <HiChevronLeft className="mr-2" />
          Undo
        </button>

        <button
          type="button"
          disabled={!undoQueue.next}
          className="ml-[2px] mr-2 py-2 rounded-r-lg disabled:bg-slate-300 rounded-l-none bg-blue-200 hover:bg-blue-300 px-4 flex items-center"
          onClick={() => {
            if (undoQueue.next) {
              setUndoQueue(undoQueue.next);
              setCurrentTree(undoQueue.next.content);
            }
          }}
        >
          Redo
          <HiChevronRight className="ml-2" />
        </button>

        <a
          href={`https://hbook.westernsydney.edu.au${model.url}`}
          target="__blank"
        >
          {model.name}
        </a>
      </div>

      {showImport && <Import {...props} tree={tree} setTree={setTree} />}

      <div style={{ paddingTop: 20 }}>
        <Tree
          tree={tree}
          rootId={0}
          render={(node, { depth, isOpen, onToggle }) => (
            <CustomNode
              node={node as NodeModel}
              depth={depth}
              isOpen={isOpen}
              onToggle={onToggle}
              programs={programOptions}
              majors={majorOptions}
              minors={minorOptions}
              all={all}
              onTextChange={handleTextChange}
              clone={clone}
              tree={tree}
              onAddNode={(node, insert) => {
                if (insert) {
                  if (Array.isArray(node)) {
                    setTree(node.concat(tree));
                  } else {
                    setTree([node].concat(tree));
                  }
                } else {
                  setTree(tree.concat(node));
                }
              }}
              onDeleteNode={(id, handleChildren) => {
                if (!handleChildren || handleChildren === "delete") {
                  setTree(tree.filter((n) => n.id !== id && n.parent !== id));
                } else {
                  let node = tree.find((t) => t.id === id);
                  setTree(
                    tree.map((t) =>
                      t.parent === id ? { ...t, parent: node!.parent } : t
                    )
                  );
                }
              }}
              onNodeChange={(id, value) => {
                const { text, droppable, ...rest } = value;
                const newTree = tree.map((node) => {
                  if (node.id === id) {
                    return {
                      ...node,
                      text: text || node.text,
                      droppable: droppable == null ? node.droppable : droppable,
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
            if (dropTarget?.data?.type?.indexOf("link") == 0) {
              return false;
            }

            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
          canDrag={(node) => !node?.data?.temp}
          // onChangeOpen={(nodes) => {
          //   let newNodes = [];
          //   for (let nodeId of nodes) {
          //     let node = tree.find((t) => t.id == nodeId)!;
          //     if (node.data?.type === "link:own") {
          //       let currentPool = tree.find((t) => t.id == node.text);

          //       if (currentPool != null) {
          //         let poolChildren = tree.filter(
          //           (t) => t.parent == currentPool!.id
          //         );
          //         newNodes.push(
          //           ...poolChildren.map((c) => ({
          //             ...c,
          //             id: getGuid(),
          //             parent: node.id,
          //             data: { ...c.data, temp: true },
          //           }))
          //         );
          //       }
          //     }
          //   }
          //   if (newNodes.length) {
          //     setTree(tree.concat(newNodes));
          //   }
          // }}

          key={model.id}
          initialOpen={true}
          // initialOpen={tree
          //   .filter(
          //     (t) =>
          //       !t.data ||
          //       !t.data.type ||
          //       (t.data.type.indexOf("link:") == -1 && t.data.type !== "pool")
          //   )
          //   .map((t) => t.id)}
        />
      </div>
    </div>
  );
};
