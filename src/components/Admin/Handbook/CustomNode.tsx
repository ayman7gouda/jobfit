import React, { useCallback, useEffect, useState } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

import { ApolloClient, DocumentNode, useApolloClient } from '@apollo/client';
import { NodeModel } from '@minoru/react-dnd-treeview';

import debounce from 'lodash/debounce';
import CloneIcon, {
  HiArrowUp, HiBeaker, HiCheck, HiChevronDown, HiChevronRight, HiCollection, HiDocument,
  HiDuplicate, HiExclamationCircle, HiFolder, HiLink, HiLockClosed, HiPencil, HiTrash, HiX
} from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { daoOutNode } from './helpers';
import {
  ProgramDocument, ProgramQueryResult, useProgramLazyQuery
} from './queries/program.query.generated';
import {
  SpecialisationDocument, SpecialisationQuery, SpecialisationQueryResult, useSpecialisationLazyQuery
} from './queries/specialisation.query.generated';
import { FileProperties, getGuid } from './types';

type Option = { name: string; value: string };

type NodeChange = (
  id: NodeModel["id"],
  value: Partial<FileProperties> & { text?: string }
) => void;

type Props = {
  node: NodeModel<FileProperties>;
  depth: number;
  isOpen: boolean;
  tree: NodeModel<FileProperties>[];
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
  onNodeChange: NodeChange;
  clone: (id: NodeModel["id"]) => void;
  onAddNode: (
    node: NodeModel<FileProperties> | Array<NodeModel<FileProperties>>,
    insert?: boolean
  ) => void;
  onDeleteNode: (id: number, handleChildren?: "delete" | "copy") => void;
  programs: Option[];
  majors: Option[];
  all: Option[];
};

function IconButton({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="cursor-pointer p-1 bg-slate-200 hover:bg-slate-400 rounded-md mx-1"
      {...rest}
    >
      {children}
    </div>
  );
}

function TextField(
  props: React.HTMLAttributes<HTMLInputElement> & { value?: string }
) {
  return (
    <input
      {...props}
      className="px-3 py-1 mx-1 w-80 border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm rounded-md"
    />
  );
}

function Select({
  children,
  ...rest
}: React.HTMLAttributes<HTMLSelectElement> & { value?: string }) {
  return (
    <select
      {...rest}
      className="block max-w-[150px] pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {children}
    </select>
  );
}

function valueFilter(options: SelectSearchOption[]) {
  return function (value: string) {
    return options.filter((o) =>
      value
        .split(" ")
        .every(
          (p) =>
            o.name.toLowerCase().indexOf(p) >= 0 ||
            (o.value as string).toLowerCase().indexOf(p) >= 0
        )
    );
  };
}

function makeName(
  nodes: { name: string; value: string }[],
  id: string,
  def = ""
) {
  let item = nodes.find((n) => n.value === id);
  if (!item || item.value == "") {
    return def;
  }
  return item.name;
}

export function EditLink(props: {
  programs: Option[];
  node: NodeModel<FileProperties>;
  onNodeChange: NodeChange;
  setLabelText(value: string): void;
  query: any;
  getData(result: any): any;
}) {
  const [programNodes, setProgramNodes] = useState(
    [] as NodeModel<FileProperties>[]
  );
  const [program, setProgram] = useState<Option | undefined>(undefined);
  const [pool, setPool] = useState<NodeModel<FileProperties> | undefined>(
    undefined
  );
  const [findProgram] = props.query({ fetchPolicy: "network-only" });

  useEffect(() => {
    if (props.node.data?.number) {
      const programId = parseInt(props.node.data?.number);
      findProgram({
        variables: { id: programId },
      }).then((result: any) => {
        let data = props.getData(result);
        if (data) {
          const nodes = daoOutNode(data);
          setProgramNodes(nodes.handbook);

          // set the program
          if (props.node.data?.number) {
            let program = props.programs.find(
              (p) => p.value == props.node.data?.number
            );
            setProgram(program);
          }

          //set the pool
          if (props.node.data?.reference) {
            let spc = nodes.handbook.find(
              (p) => p.id == props.node.data?.reference
            );
            setPool(spc);
          }
        }
      });
    }
  }, []);

  return (
    <>
      <SelectSearch
        options={props.programs}
        value={props.node.data?.number}
        onChange={(e) => {
          if (!e) {
            return;
          }

          let id = e as unknown as string;
          let numId = parseInt(id);

          let program = props.programs.find((p) => p.value == id);

          setProgram(program);
          props.setLabelText(program?.name + " > None");
          props.onNodeChange(props.node.id, {
            number: e as unknown as string,
          });

          findProgram({ variables: { id: numId } }).then((result: any) => {
            let data = props.getData(result);
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
        value={props.node.data?.reference}
        style={{ minWidth: 180 }}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          let id = e.currentTarget.value;
          props.onNodeChange(props.node.id, {
            reference: id,
          });

          let spc = programNodes.find((p) => p.id == id);
          setPool(spc);
          props.setLabelText(program?.name + " > " + spc?.text);
        }}
      >
        <option value="">Please Select</option>
        {programNodes
          .filter((n) => n.data?.type === "pool")
          .map((p) => (
            <option key={p.id} value={p.id}>
              {p.text}
            </option>
          ))}
      </Select>
      <TextField
        className={styles.textField}
        value={props.node.data?.selector}
        onChange={(e) => {
          props.onNodeChange(props.node.id, {
            selector: e.currentTarget.value,
          });
          props.setLabelText(
            program?.name +
              (pool ? " > " + pool.text : "") +
              (e.currentTarget.value ? " > " + e.currentTarget.value : "")
          );
        }}
        style={{ width: 200, margin: "0px 8px" }}
        placeholder="Selector"
      />
      <TextField
        className={styles.textField}
        value={props.node.data?.level}
        onChange={(e) => {
          props.onNodeChange(props.node.id, {
            level: e.currentTarget.value,
          });
        }}
        style={{ width: 80, margin: "0px 8px" }}
        placeholder="Level"
      />
    </>
  );
}

export const CustomNode: React.FC<Props> = (props) => {
  const { id, text } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const [linkError, setLinkError] = useState<string | null>(null);

  const indent = props.depth * 24;
  const client = useApolloClient();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e: React.ChangeEvent<any>) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const checkLink = useCallback(
    debounce(() => {
      if (
        props.node.data?.reference &&
        (props.node.data?.type === "specialisationLink" ||
          props.node.data?.type === "programLink")
      ) {
        if (props.node.data?.type === "specialisationLink") {
          checkPoolLink(
            client,
            props.node,
            SpecialisationDocument,
            "specialisation"
          ).then((a) => setLinkError(a));
        } else if (props.node.data?.type === "programLink") {
          checkPoolLink(client, props.node, ProgramDocument, "program").then(
            (a) => setLinkError(a)
          );
        }
      }
    }, 1000),
    [props.node]
  );

  useEffect(() => {
    checkLink();
  });

  // console.log(props.node.id + " " + props.node.text);

  return (
    <div
      className={styles.root}
      style={{
        paddingInlineStart: indent,
        background: props.node.data?.flagged ? "salmon" : "",
      }}
      data-testid={`custom-node-${id}`}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            {props.isOpen ? (
              <HiChevronDown data-testid={`arrow-right-icon-${id}`} />
            ) : (
              <HiChevronRight data-testid={`arrow-right-icon-${id}`} />
            )}
          </div>
        )}
      </div>
      {linkError && (
        <HiExclamationCircle
          title={linkError}
          style={{ color: "red", width: 30, height: 30 }}
        />
      )}

      {props.node.data?.type === "link" ? (
        <HiLink style={{ color: "purple" }} />
      ) : props.node.data?.type === "programLink" ? (
        <HiLink style={{ color: "orange" }} />
      ) : props.node.data?.type === "specialisationLink" ? (
        <HiLink style={{ color: "blue" }} />
      ) : props.node.data?.type === "elective" ? (
        <HiBeaker style={{ color: "green" }} />
      ) : props.node.data?.type === "programConstraint" ? (
        <HiLockClosed style={{ color: "red" }} />
      ) : props.node.droppable ? (
        <HiFolder />
      ) : (
        <HiDocument />
      )}
      {props.node.data?.type &&
        props.node.data?.type !== "programConstraint" &&
        props.node.droppable && (
          <div
            style={{
              background:
                props.node.data?.type === "and"
                  ? "salmon"
                  : props.node.data?.type == "or"
                  ? "lightGreen"
                  : props.node.data?.type === "pool"
                  ? "blue"
                  : props.node.data?.type === "major"
                  ? "purple"
                  : "lightBlue",
              borderRadius: 6,
              whiteSpace: "nowrap",
              color: "white",
              padding: `2px 4px`,
              fontSize: 12,
              marginLeft: 4,
            }}
          >
            {props.node.data?.type.toUpperCase()}{" "}
            {props.node.data.type === "or" && props.node.data.number
              ? props.node.data.number
              : null}
            {props.node.data.type === "or" && props.node.data.credits
              ? props.node.data.credits + "c"
              : null}
          </div>
        )}

      <div className={styles.nodeInner}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            {props.node.data?.type === "programLink" && (
              <EditLink
                programs={props.programs}
                node={props.node}
                onNodeChange={props.onNodeChange}
                setLabelText={setLabelText}
                query={useProgramLazyQuery}
                getData={(result: ProgramQueryResult) => result.data?.program}
              />
            )}
            {props.node.data?.type === "specialisationLink" && (
              <EditLink
                programs={props.majors}
                node={props.node}
                onNodeChange={props.onNodeChange}
                setLabelText={setLabelText}
                query={useSpecialisationLazyQuery}
                getData={(result: SpecialisationQueryResult) =>
                  result.data?.specialisation
                }
              />
            )}
            {props.node.data?.type === "programConstraint" ? (
              <SelectSearch
                options={props.all}
                value={labelText}
                onChange={(e) => setLabelText(e as unknown as string)}
                search
                filterOptions={valueFilter}
                placeholder="Select the program or specialisation"
              />
            ) : // <select
            //   onChange={handleChangeText}
            //   value={labelText}
            //   style={{ maxWidth: 400 }}
            // >
            //   <option value="">All Programs</option>
            //   {props.programs.map((p, i) => (
            //     <option key={p.content.code} value={p.content.code}>
            //       {p.content.name} [{p.content.code}]
            //     </option>
            //   ))}
            // </select>
            props.node.data?.type === "link" ? (
              <Select
                value={labelText}
                style={{ minWidth: 280 }}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setLabelText(e.currentTarget.value)
                }
              >
                <option value="">Please Select</option>
                {props.tree
                  .filter((n) => n.data?.type === "pool")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.text}
                    </option>
                  ))}
              </Select>
            ) : props.node.data?.type === "major" ||
              props.node.data?.type === "minor" ? (
              <SelectSearch
                options={props.majors}
                value={labelText}
                onChange={(e) => setLabelText(e as unknown as string)}
                search
                filterOptions={valueFilter}
                placeholder="Select the major"
              />
            ) : props.node.data?.type === "subject" ||
              props.node.data?.type == "pool" ||
              !props.node.data?.type ? (
              <TextField
                className={styles.textField}
                value={labelText}
                onChange={handleChangeText}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSubmit();
                  }
                }}
              />
            ) : null}
            {props.node.droppable && (
              <>
                <Select
                  onChange={(e) =>
                    props.onNodeChange(id, { type: e.currentTarget.value })
                  }
                  value={props.node.data?.type}
                  style={{ marginRight: 4, width: 180 }}
                >
                  <option value="">Please Select ...</option>
                  <option value="or">Or</option>
                  <option value="">And</option>
                  <option value="pool">Pool</option>
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                  <option value="programConstraint">Program Constraint</option>
                </Select>
              </>
            )}
            {props.node.droppable && props.node.data?.type === "or" && (
              <>
                <TextField
                  className={styles.textField}
                  style={{ width: 40, marginLeft: 8 }}
                  value={props.node.data!.number || ""}
                  placeholder="#"
                  onChange={(e) => {
                    setLabelText(
                      `Select ${e.currentTarget.value} of the following`
                    );
                    props.onNodeChange(id, {
                      number: e.currentTarget.value,
                      // text: `Select ${e.currentTarget.value} of the following`,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleSubmit();
                    }
                  }}
                />

                <TextField
                  className={styles.textField}
                  style={{ width: 40, marginLeft: 8 }}
                  value={props.node.data!.credits || ""}
                  placeholder="cred."
                  onChange={(e) =>
                    props.onNodeChange(id, { credits: e.currentTarget.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </>
            )}

            {!props.node.droppable && (
              <>
                {(props.node.data?.type === "link" ||
                  props.node.data?.type === "elective") && (
                  <TextField
                    className={styles.textField}
                    value={props.node.data?.level}
                    onChange={(e) => {
                      props.onNodeChange(props.node.id, {
                        level: e.currentTarget.value,
                      });
                    }}
                    style={{ width: 80, margin: "0px 8px" }}
                    placeholder="Level"
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                )}
                <Select
                  onChange={(e) =>
                    props.onNodeChange(id, { type: e.currentTarget.value })
                  }
                  value={props.node.data?.type}
                  style={{ marginRight: 4 }}
                >
                  <option value="subject">Subject</option>
                  <option value="link">Pool Link</option>
                  <option value="programLink">Program Link</option>
                  <option value="specialisationLink">
                    Specialisation Link
                  </option>
                  <option value="elective">Elective</option>
                  <option value="programConstraint">Criteria</option>
                </Select>
              </>
            )}

            <IconButton onClick={handleSubmit} data-testid={`btn-submit-${id}`}>
              <HiCheck />
            </IconButton>

            <IconButton onClick={handleCancel} data-testid={`btn-cancel-${id}`}>
              <HiX />
            </IconButton>

            <input
              type="checkbox"
              title="Flag Warning"
              checked={props.node.data?.flagged}
              onClick={(e) =>
                props.onNodeChange(id, { flagged: e.currentTarget.checked })
              }
            />

            {props.node.droppable && (
              <>
                <IconButton
                  title="Add And Folder"
                  onClick={() =>
                    props.onAddNode({
                      id: getGuid(),
                      parent: props.node.id,
                      droppable: true,
                      text: "Complete all of the following",
                    })
                  }
                >
                  <HiFolder style={{ color: "salmon" }} />
                </IconButton>

                <IconButton
                  title="Add Or Folder"
                  onClick={() =>
                    props.onAddNode({
                      id: getGuid(),
                      parent: props.node.id,
                      droppable: true,
                      text: `Select 1 of the following`,
                      data: {
                        type: "or",
                        number: "1",
                      },
                    })
                  }
                >
                  <HiFolder style={{ color: "lightGreen" }} />
                </IconButton>

                <IconButton
                  title="Add Subject"
                  onClick={() =>
                    props.onAddNode({
                      id: getGuid(),
                      parent: props.node.id,
                      text: "Subject",
                    })
                  }
                >
                  <HiDocument />
                </IconButton>

                <IconButton
                  title="Add Constraint"
                  onClick={() =>
                    props.onAddNode({
                      id: getGuid(),
                      parent: props.node.id,
                      text: "",
                      droppable: props.node.data?.type !== "programConstraint",
                      data: {
                        type: "programConstraint",
                      },
                    })
                  }
                >
                  <HiLockClosed />
                </IconButton>

                <IconButton
                  title="Add Year"
                  onClick={() => {
                    function addYear(num: number) {
                      let yearId = getGuid();

                      return [
                        {
                          id: yearId,
                          parent: props.node.id,
                          text: "Year " + num,
                          droppable: true,
                        },

                        {
                          id: getGuid(),
                          parent: yearId,
                          text: "Autumn",
                          droppable: true,
                        },

                        {
                          id: getGuid(),
                          parent: yearId,
                          text: "Spring",
                          droppable: true,
                        },
                      ];
                    }
                    props.onAddNode(
                      [
                        ...addYear(1),
                        ...addYear(2),
                        ...addYear(3),
                        ...addYear(4),
                      ],
                      true
                    );
                  }}
                >
                  <HiCollection />
                </IconButton>

                <IconButton
                  title="Copy children to parent"
                  onClick={() =>
                    props.onDeleteNode(props.node.id as any, "copy")
                  }
                >
                  <HiArrowUp />
                </IconButton>

                <IconButton
                  onClick={() => props.onDeleteNode(props.node.id as any)}
                >
                  <HiTrash />
                </IconButton>
              </>
            )}
          </div>
        ) : (
          <div className={styles.inputWrapper}>
            <div
              style={{ cursor: "pointer" }}
              onClick={handleShowInput}
              className={styles.nodeLabel}
            >
              {props.node.data?.type === "programConstraint"
                ? makeName(props.all, props.node.text, "Program Constraints")
                : props.node.data?.type === "major" ||
                  props.node.data?.type === "minor"
                ? makeName(props.majors, props.node.text)
                : props.node.data?.type === "link"
                ? props.tree.find((t) => t.id === parseInt(props.node.text))
                    ?.text +
                  (props.node.data?.level
                    ? `, level ${props.node.data?.level}`
                    : "")
                : props.node.data?.type === "elective"
                ? `Elective${
                    props.node.data.level
                      ? `, Level ${props.node.data.level}`
                      : ""
                  }`
                : props.node.text}
            </div>

            <IconButton onClick={handleShowInput}>
              <HiPencil />
            </IconButton>
            <IconButton title="Clone Node" onClick={() => props.clone(id)}>
              <HiDuplicate />
            </IconButton>
            <IconButton
              onClick={() => props.onDeleteNode(props.node.id as any)}
            >
              <HiTrash />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

async function checkPoolLink(
  client: ApolloClient<object>,
  node: NodeModel<FileProperties>,
  document: DocumentNode,
  name: "program" | "specialisation"
) {
  const program = await client.query({
    query: document,
    variables: { id: node.data?.number },
  });
  if (
    program.data == null ||
    program.data[name] == null ||
    program.data[name].handbook == null
  ) {
    return "Not found or not processed yet!";
  }
  let data = program.data[name];
  if (
    node.data?.reference &&
    data.handbook?.every(
      (h: any) => h.nodeId.toString() != node.data?.reference
    )
  ) {
    return "Pool not found";
  }
  if (node.data && node.data.selector && node.data.reference) {
    // get all nodes of the pool node
    let poolNodes = data.handbook.filter(
      (n: any) => n.parentId && n.parentId.toString() === node.data!.reference
    );
    if (poolNodes.length == 0) {
      return "Selected pool has nothing to select from ;(";
    }

    // check if all pool nodes contain the selected selection
    for (let poolNode of poolNodes) {
      if (poolNode.type === "major" || poolNode.type === "minor") {
        let subPool = await await client.query<SpecialisationQuery>({
          query: SpecialisationDocument,
          variables: { id: parseInt(node.text) },
        });
        if (
          subPool == null ||
          subPool.data == null ||
          subPool.data.specialisation == null
        ) {
          return "Invalid pool declaration";
        }
        if (subPool.data.specialisation.handbook == null) {
          return (
            "Specialisation not yet processed: " +
            subPool.data.specialisation.name
          );
        }

        let poolNodes = subPool.data.specialisation.handbook.filter(
          (h) => h.type === "pool"
        );
        if (poolNodes.every((p) => p.text !== node.data!.selector)) {
          return `Specialisation "${subPool.data.specialisation.name} [${
            subPool.data.specialisation.code
          }] does not contain pool named "${node.data!.selector}"`;
        }
      }
    }
    // if (program.data.program.handbook?.every(
    //   (h) => !h.parentId || program.data.program!.handbook!.find(v => v.id === h.parentId)?.text != node.data?.selector
    // ))
  }
  return "";
}
