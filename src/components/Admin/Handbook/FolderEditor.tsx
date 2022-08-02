import { useState } from 'react';

import { NodeType } from 'generated/clientTypes';
import {
  HiArrowUp, HiCheck, HiCollection, HiDocumentAdd, HiDownload, HiFolderAdd, HiLockClosed,
  HiOutlineDocument, HiTrash, HiX
} from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { LinkEditor } from './LinkNode';
import { ProgramQueryResult, useProgramLazyQuery } from './queries/program.query.generated';
import {
  SpecialisationQueryResult, useSpecialisationLazyQuery
} from './queries/specialisation.query.generated';
import { getGuid, IconButton, Select, TextField } from './shared';
import { CustomNodeChildProps, NodeModel } from './types';

export function FolderEditor(props: CustomNodeChildProps) {
  const [labelText, setLabelText] = useState(props.node.text);
  const { id, text } = props.node;

  const handleCancel = () => {
    setLabelText(text);
    props.setVisibleInput(false);
  };

  const handleSubmit = () => {
    props.setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className="flex mx-2">
        <div
          onClick={() =>
            props.onNodeChange(id, {
              selection: "AND",
            })
          }
          className={`${
            props.node.data.selection === "AND"
              ? "bg-green-400"
              : "bg-slate-200"
          } ${
            props.node.data.selection === "AND" ? "text-white" : ""
          } px-2 py-1 rounded-l-lg cursor-pointer`}
        >
          And
        </div>
        <div
          onClick={() =>
            props.onNodeChange(id, {
              selection: "OR",
            })
          }
          className={`${
            props.node.data.selection === "OR" ? "bg-green-400" : "bg-slate-200"
          } ${
            props.node.data.selection === "OR" ? "text-white" : ""
          } px-2 py-1 rounded-r-lg cursor-pointer`}
        >
          Or
        </div>
      </div>

      {props.node.data.type?.indexOf("Link") === -1 && (
        <TextField
          key="text"
          className={styles.textField}
          value={labelText}
          onChange={(e) => {
            setLabelText(e.currentTarget.value);
          }}
          style={{ width: 250, margin: "0px 8px" }}
          placeholder="Text"
        />
      )}

      {props.node.data.selection === "OR" && (
        <>
          <TextField
            type="number"
            key="Number"
            className={styles.textField}
            style={{ width: 70, marginLeft: 8 }}
            value={props.node.data.number?.toString()}
            placeholder="Min"
            onChange={(e) => {
              props.onNodeChange(id, {
                number:
                  e.currentTarget.value === ""
                    ? undefined
                    : parseFloat(e.currentTarget.value),
              });
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
          />
          <TextField
            type="number"
            key="MaxNumber"
            className={styles.textField}
            style={{ width: 70, marginLeft: 8 }}
            value={props.node.data.maxNumber?.toString()}
            placeholder="Max"
            onChange={(e) => {
              props.onNodeChange(id, {
                maxNumber:
                  e.currentTarget.value === ""
                    ? undefined
                    : parseFloat(e.currentTarget.value),
              });
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
          />
          {/* <TextField
            type="number"
            key="Credits"
            className={styles.textField}
            style={{ width: 70, marginLeft: 8 }}
            value={props.node.data.credits?.toString()}
            placeholder="Cr."
            onChange={(e) =>
              props.onNodeChange(id, {
                credits:
                  e.currentTarget.value === ""
                    ? undefined
                    : parseFloat(e.currentTarget.value),
              })
            }
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
          /> */}
        </>
      )}

      {props.node.data.type === "LinkProgram" && (
        <LinkEditor
          programs={props.programs}
          node={props.node}
          onNodeChange={props.onNodeChange}
          setLabelText={setLabelText}
          query={useProgramLazyQuery}
          getData={(result: ProgramQueryResult) => result.data?.program}
        />
      )}
      {(props.node.data.type === "LinkMajor" ||
        props.node.data.type === "LinkMinor") && (
        <LinkEditor
          programs={
            props.node.data.type === "LinkMajor" ? props.majors : props.minors
          }
          node={props.node}
          onNodeChange={props.onNodeChange}
          setLabelText={setLabelText}
          query={useSpecialisationLazyQuery}
          getData={(result: SpecialisationQueryResult) =>
            result.data?.specialisation
          }
        />
      )}
      {props.node.data.type === "LinkCollection" && (
        <Select
          value={props.node.data.reference?.toString()}
          style={{ minWidth: 280 }}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            props.onNodeChange(props.node.id, {
              reference: parseInt(e.currentTarget.value),
            })
          }
        >
          <option value="">Please Select</option>
          {props.tree
            .filter((n) => n.data.type === "Collection")
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.text}
              </option>
            ))}
        </Select>
      )}

      {props.node.data.type &&
        (props.node.data.type.indexOf("LinkCollection") >= 0 ||
          props.node.data.type === "LinkElective") && (
          <TextField
            type="number"
            className={styles.textField}
            value={props.node.data.level?.toString()}
            onChange={(e) => {
              props.onNodeChange(props.node.id, {
                level:
                  e.currentTarget.value === ""
                    ? undefined
                    : parseFloat(e.currentTarget.value),
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
        onChange={(e) => {
          props.onNodeChange(id, { type: e.currentTarget.value as NodeType });
          if (e.currentTarget.value === "LinkElective") {
            setLabelText("Electives");
          }
        }}
        className="bg-blue-200"
        value={props.node.data.type}
        style={{ marginRight: 4, width: 180, background: "rgb(226 232 240)" }}
      >
        <option value="Folder">Sequence</option>
        <option value="Collection">Collection</option>
        <option value="Program">Program</option>
        <optgroup label="Links">
          <option value="LinkElective">Elective Link</option>
          <option value="LinkCollection">Collection Link</option>
          <option value="LinkProgram">Program Link</option>
          <option value="LinkMajor">Major Link</option>
          <option value="LinkMinor">Minor Link</option>
        </optgroup>
      </Select>

      <IconButton onClick={handleSubmit}>
        <HiCheck />
      </IconButton>

      <IconButton onClick={handleCancel}>
        <HiX />
      </IconButton>

      {props.node.data.type?.indexOf("Link") === -1 && (
        <>
          <IconButton
            title="Add AND Folder"
            onClick={() =>
              props.onAddNode({
                id: getGuid(),
                parent: props.node.id,
                droppable: true,
                text: "",
                data: {
                  type: "Folder",
                  selection: "AND",
                },
              })
            }
          >
            <HiFolderAdd style={{ color: "salmon" }} />
          </IconButton>

          <IconButton
            title="Add OR Folder"
            onClick={() =>
              props.onAddNode({
                id: getGuid(),
                parent: props.node.id,
                droppable: true,
                text: "",
                data: {
                  type: "Folder",
                  number: 1,
                  selection: "OR",
                },
              })
            }
          >
            <HiFolderAdd style={{ color: "green" }} />
          </IconButton>

          {/* <IconButton
        title="Add Collection"
        onClick={() =>
          props.onAddNode({
            id: getGuid(),
            parent: props.node.id,
            droppable: true,
            text: `Select 1 of the following`,
            data: {
              type: "collection",
              selection: 'OR',
              number: 0,
            },
          })
        }
      >
        <HiFolder style={{ color: "green" }} />
      </IconButton> */}

          <IconButton
            title="Add Subject"
            onClick={() =>
              props.onAddNode({
                id: getGuid(),
                parent: props.node.id,
                text: "Subject",
                data: {
                  type: "Subject",
                },
              })
            }
          >
            <HiDocumentAdd />
          </IconButton>

          <IconButton
            title="Add Constraint"
            onClick={() =>
              props.onAddNode({
                id: getGuid(),
                parent: props.node.id,
                text: "",
                data: {
                  type: "ConstraintProgram",
                },
              })
            }
          >
            <HiLockClosed />
          </IconButton>

          <IconButton
            title="Import Items"
            onClick={() => props.setImportRootId(props.node.id)}
          >
            <HiDownload />
          </IconButton>

          <IconButton
            title="Add 4 Years"
            onClick={() => {
              function addYear(num: number) {
                let yearId = getGuid();

                return [
                  {
                    id: yearId,
                    parent: props.node.id,
                    text: "Year " + num,
                    droppable: true,
                    data: {
                      type: "Folder",
                      selection: "AND",
                    },
                  },

                  {
                    id: getGuid(),
                    parent: yearId,
                    text: "Autumn",
                    droppable: true,
                    data: {
                      type: "Folder",
                      selection: "AND",
                    },
                  },

                  {
                    id: getGuid(),
                    parent: yearId,
                    text: "Spring",
                    droppable: true,
                    data: {
                      type: "folder",
                      selection: "AND",
                    },
                  },
                ] as NodeModel[];
              }
              props.onAddNode(
                [...addYear(1), ...addYear(2), ...addYear(3), ...addYear(4)],
                true
              );
            }}
          >
            <HiCollection />
          </IconButton>

          <IconButton
            title="Copy children to parent"
            onClick={() => props.onDeleteNode(props.node.id as any, "copy")}
          >
            <HiArrowUp />
          </IconButton>
        </>
      )}

      <IconButton
        title="Convert to leaf node"
        onClick={() =>
          props.onNodeChange(props.node.id, {
            droppable: false,
          })
        }
      >
        <HiOutlineDocument style={{ color: "blue" }} />
      </IconButton>

      <IconButton onClick={() => props.onDeleteNode(props.node.id as any)}>
        <HiTrash />
      </IconButton>

      <input
        type="checkbox"
        title="Flag Warning"
        className="ml-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        checked={props.node.data.flagged}
        onClick={(e) =>
          props.onNodeChange(id, { flagged: e.currentTarget.checked })
        }
      />
    </div>
  );
}
