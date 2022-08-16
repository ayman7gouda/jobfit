import React, { useState } from 'react';
import SelectSearch from 'react-select-search';

import { NodeType } from 'generated/clientTypes';
import CloneIcon, {
  HiCheck, HiChevronRight, HiDocument, HiDuplicate, HiFolder, HiInformationCircle, HiLockClosed,
  HiPencil, HiTrash, HiX
} from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { extractCode, extractName } from './helpers';
import { LinkNode, valueFilter } from './LinkNode';
import { IconButton, Select, TextField } from './shared';
import { CustomNodeChildProps, Option } from './types';

export function LeafEditor(props: CustomNodeChildProps) {
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
      {(!props.node.data.type || props.node.data.type === "Subject") && (
        <TextField
          className={styles.textField}
          value={labelText}
          onChange={(e) => {
            setLabelText(e.currentTarget.value);

            let code = extractCode(e.currentTarget.value);
            if (code) {
              let name = extractName(e.currentTarget.value);

              props.onNodeChange(props.node.id, {
                subjectCode: code,
                subjectName: name!,
              });
            }
          }}
          style={{ width: 250, margin: "0px 8px" }}
          placeholder="Text"
        />
      )}

      {(props.node.data.type === "ConstraintProgram" ||
        props.node.data.type === "ConstraintProgramNot") && (
        <SelectSearch
          options={props.all}
          value={props.node.data.reference as unknown as string}
          onChange={(e) =>
            props.onNodeChange(props.node.id, {
              reference: parseInt(e as unknown as string),
            })
          }
          search
          filterOptions={valueFilter}
          placeholder="Select the program or specialisation"
        />
      )}

      <Select
        onChange={(e) =>
          props.onNodeChange(id, { type: e.currentTarget.value as NodeType })
        }
        value={props.node.data.type}
        style={{ marginRight: 4 }}
      >
        <option value="Subject">Subject</option>
        <option value="ConstraintProgram">+ Program Constraint</option>
        <option value="ConstraintProgramNot">- Program Constraint</option>
        {/* <option value="elective">Elective</option> */}
      </Select>

      <IconButton onClick={handleSubmit}>
        <HiCheck />
      </IconButton>

      <IconButton onClick={handleCancel}>
        <HiX />
      </IconButton>

      <IconButton onClick={() => props.onDeleteNode(props.node.id as any)}>
        <HiTrash />
      </IconButton>

      <IconButton
        title="Convert to AND folder"
        onClick={() =>
          props.onNodeChange(props.node.id, {
            droppable: true,
            selection: "AND",
          })
        }
      >
        <HiFolder style={{ color: "salmon" }} />
      </IconButton>

      <IconButton
        title="Convert to OR folder"
        onClick={() => {
          {
            props.onNodeChange(props.node.id, {
              text: "",
              droppable: true,
              selection: "OR",
              number: 1,
            });
            setLabelText("");
            props.setVisibleInput(false);
          }
        }}
      >
        <HiFolder style={{ color: "green" }} />
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

function makeName(nodes: Option[], id?: number, def = "", level?: string) {
  if (!id) {
    return def;
  }
  let item = nodes.find((n) => n.value === id);
  if (!item || item.value == null) {
    return def;
  }
  return item.name + (level != null ? `, level ${level}` : "");
}

export const LeafNode: React.FC<CustomNodeChildProps> = (props) => {
  const { id } = props.node;

  const indent = props.depth * 24;

  const handleShowInput = () => {
    props.setVisibleInput(true);
  };

  return (
    <div
      className={styles.root + " " + styles.buttons}
      style={{
        paddingInlineStart: indent,
        background: props.node.data.temp
          ? "silver"
          : props.node.data.flagged
          ? "salmon"
          : "",
      }}
    >
      <div className={styles.arrow}></div>

      {props.node.data.type && props.node.data.type.indexOf("Link") == 0 && (
        <LinkNode
          node={props.node}
          collection={props.node.data.collection}
          reference={props.node.data.reference}
        />
      )}

      {props.node.data.type === "ConstraintProgramNot" ? (
        <HiLockClosed style={{ color: "purple" }} />
      ) : props.node.data.type === "ConstraintProgram" ? (
        <HiLockClosed style={{ color: "red" }} />
      ) : props.node.data.type === "Info" ? (
        <HiInformationCircle style={{ color: "blue" }} />
      ) : (
        <HiDocument />
      )}

      <div className={styles.nodeInner}>
        {props.visibleInput ? (
          <div className={styles.inputWrapper}>
            <LeafEditor {...props} />
          </div>
        ) : (
          <div className={styles.inputWrapper}>
            <div
              style={{ cursor: "pointer" }}
              onClick={handleShowInput}
              className={styles.nodeLabel}
            >
              {props.node.data.type === "ConstraintProgramNot" && "Not "}

              {props.node.data.type === "ConstraintProgram" ||
              props.node.data.type === "ConstraintProgramNot" ? (
                makeName(
                  props.all,
                  props.node.data.reference,
                  "Program Constraints"
                )
              ) : props.node.data.subjectCode ? (
                <div className="flex items-center">
                  {props.node.data.subjectCode} <HiChevronRight />{" "}
                  {props.node.data.subjectName}
                </div>
              ) : (
                props.node.text
              )}
            </div>

            <div className={styles.dynamic}>
              <IconButton onClick={handleShowInput}>
                <HiPencil />
              </IconButton>
              <IconButton
                className="bg-green-800"
                title="Clone Node"
                onClick={() => props.clone(id)}
              >
                <HiDuplicate />
              </IconButton>
              <IconButton
                className="bg-red-800"
                onClick={() => props.onDeleteNode(props.node.id as any)}
              >
                <HiTrash />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
