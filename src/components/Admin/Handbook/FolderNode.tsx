import { useState } from 'react';

import { Selection } from 'generated/clientTypes';
import {
  HiArrowUp, HiBeaker, HiCheck, HiChevronDown, HiChevronRight, HiCollection, HiDocument,
  HiDuplicate, HiFolder, HiLink, HiLockClosed, HiOutlineDocument, HiPencil, HiTrash, HiX
} from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { LinkEditor } from './LinkNode';
import { ProgramQueryResult, useProgramLazyQuery } from './queries/program.query.generated';
import {
  SpecialisationQueryResult, useSpecialisationLazyQuery
} from './queries/specialisation.query.generated';
import { getGuid, IconButton, Select, TextField } from './shared';
import { CustomNodeProps, NodeModel, NodeType } from './types';

export function FolderEditor(
  props: CustomNodeProps & { setVisibleInput: Function }
) {
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
              selection: Selection.And,
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
              selection: Selection.Or,
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

      {props.node.data.type?.indexOf("link") === -1 && (
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

      {/* <Select
        onChange={(e) =>
          props.onNodeChange(id, {
            selection: e.currentTarget.value as Selection,
          })
        }
        value={props.node.data.selection}
        style={{ marginRight: 4, width: 80 }}
      >
        <option value="AND">And</option>
        <option value="OR">Or</option>
      </Select> */}

      {props.node.data.selection === "OR" && (
        <>
          <TextField
            type="number"
            key="Number"
            className={styles.textField}
            style={{ width: 70, marginLeft: 8 }}
            value={props.node.data.number?.toString()}
            placeholder="#"
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
          />
        </>
      )}

      {props.node.data.type === "link:program" && (
        <LinkEditor
          programs={props.programs}
          node={props.node}
          onNodeChange={props.onNodeChange}
          setLabelText={setLabelText}
          query={useProgramLazyQuery}
          getData={(result: ProgramQueryResult) => result.data?.program}
        />
      )}
      {(props.node.data.type === "link:major" ||
        props.node.data.type === "link:minor") && (
        <LinkEditor
          programs={
            props.node.data.type === "link:major" ? props.majors : props.minors
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
      {props.node.data.type === "link:collection" && (
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
            .filter((n) => n.data.type === "collection")
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.text}
              </option>
            ))}
        </Select>
      )}

      {props.node.data.type &&
        (props.node.data.type.indexOf("link:collection") >= 0 ||
          props.node.data.type === "link:elective") && (
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
        onChange={(e) =>
          props.onNodeChange(id, { type: e.currentTarget.value as NodeType })
        }
        value={props.node.data.type}
        style={{ marginRight: 4, width: 180 }}
      >
        <option value="folder">Sequence</option>
        <option value="collection">Collection</option>

        <optgroup label="Links">
          <option value="link:elective">Electives</option>
          <option value="link:collection">Collection</option>
          <option value="link:program">Program</option>
          <option value="link:major">Major</option>
          <option value="link:minor">Minor</option>
        </optgroup>
      </Select>

      <IconButton onClick={handleSubmit}>
        <HiCheck />
      </IconButton>

      <IconButton onClick={handleCancel}>
        <HiX />
      </IconButton>

      <IconButton
        title="Add Folder"
        onClick={() =>
          props.onAddNode({
            id: getGuid(),
            parent: props.node.id,
            droppable: true,
            text: "Complete all of the following",
            data: {
              type: "folder",
              selection: Selection.And,
            },
          })
        }
      >
        <HiFolder style={{ color: "salmon" }} />
      </IconButton>

      <IconButton
        title="Add Collection"
        onClick={() =>
          props.onAddNode({
            id: getGuid(),
            parent: props.node.id,
            droppable: true,
            text: `Select 1 of the following`,
            data: {
              type: "collection",
              selection: Selection.Or,
              number: 0,
            },
          })
        }
      >
        <HiFolder style={{ color: "green" }} />
      </IconButton>

      <IconButton
        title="Add Subject"
        onClick={() =>
          props.onAddNode({
            id: getGuid(),
            parent: props.node.id,
            text: "Subject",
            data: {
              type: "subject",
            },
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
            data: {
              type: "constraint:program",
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
                data: {
                  type: "folder",
                  selection: Selection.And,
                },
              },

              {
                id: getGuid(),
                parent: yearId,
                text: "Autumn",
                droppable: true,
                data: {
                  type: "folder",
                  selection: Selection.And,
                },
              },

              {
                id: getGuid(),
                parent: yearId,
                text: "Spring",
                droppable: true,
                data: {
                  type: "folder",
                  selection: Selection.And,
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

export const FolderNode: React.FC<CustomNodeProps> = (props) => {
  const { id } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);

  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const color = props.node.data.selection === "AND" ? "salmon" : "green";

  return (
    <div
      className={styles.root}
      style={{
        paddingInlineStart: indent,
        background: props.node.data.temp
          ? "silver"
          : props.node.data.flagged
          ? "salmon"
          : "",
      }}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.data.type?.indexOf("link") === -1 && (
          <div onClick={handleToggle}>
            {props.isOpen ? <HiChevronDown /> : <HiChevronRight />}
          </div>
        )}
      </div>

      {props.node.data.type === "link:elective" ? (
        <HiBeaker style={{ color: "green" }} />
      ) : props.node.data.type === "link:collection" ? (
        <HiLink style={{ color: "purple" }} />
      ) : props.node.data.type === "link:program" ? (
        <HiLink style={{ color: "orange" }} />
      ) : props.node.data.type === "link:major" ? (
        <HiLink style={{ color: "blue" }} />
      ) : props.node.data.type === "link:minor" ? (
        <HiLink style={{ color: "yellow" }} />
      ) : props.node.data.type === "collection" ? (
        <HiCollection style={{ color }} />
      ) : (
        <HiFolder style={{ color }} />
      )}

      <div className={styles.nodeInner}>
        {visibleInput ? (
          <FolderEditor {...props} setVisibleInput={setVisibleInput} />
        ) : (
          <div className={styles.inputWrapper}>
            {props.node.data.type !== "folder" && (
              <>
                {props.node.data.selection === "AND" && (
                  <div
                    className="bg-red-400 px-2 py-1 mr-1 rounded-lg nowrap text-white text-xs"
                    style={{}}
                  >
                    All of
                  </div>
                )}
                {props.node.data.selection === "OR" && (
                  <div
                    className="bg-green-400 px-2 py-1 mr-1 rounded-lg nowrap text-white text-xs"
                    style={{}}
                  >
                    {props.node.data.number === 0
                      ? "Any of"
                      : `${props.node.data.number} of`}
                    {props.node.data.credits
                      ? props.node.data.credits + "c"
                      : null}
                  </div>
                )}
              </>
            )}
            <div
              style={{ cursor: "pointer" }}
              onClick={handleShowInput}
              className={styles.nodeLabel}
            >
              {props.node.data.type === "link:collection"
                ? props.tree.find((t) => t.id === props.node.data.reference)
                    ?.text || "Not Found "
                : props.node.text}
              {props.node.data.level != null
                ? `, Level ${props.node.data.level}`
                : null}
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
