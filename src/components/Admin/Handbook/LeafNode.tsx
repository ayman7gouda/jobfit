import React, { useState } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

import CloneIcon, {
  HiBeaker, HiCheck, HiDocument, HiDuplicate, HiFolder, HiLockClosed, HiPencil, HiTrash, HiX
} from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { LinkNode } from './LinkNode';
import { IconButton, Select, TextField } from './shared';
import { CustomNodeProps, NodeType, Option } from './types';

export function LeafEditor(
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
      <TextField
        className={styles.textField}
        value={labelText}
        onChange={(e) => {
          setLabelText(e.currentTarget.value);
        }}
        style={{ width: 250, margin: "0px 8px" }}
        placeholder="Text"
      />

      {props.node.data.type === "constraint:program" && (
        <SelectSearch
          options={props.all}
          value={labelText}
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

      {props.node.data.type &&
        (props.node.data.type.indexOf("link:own") >= 0 ||
          props.node.data.type === "elective") && (
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
        style={{ marginRight: 4 }}
      >
        <option value="subject">Subject</option>
        <option value="constraint:program">Program Constraint</option>
        <option value="elective">Elective</option>
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
        title="Convert to folder"
        onClick={() =>
          props.onNodeChange(props.node.id, {
            droppable: true,
          })
        }
      >
        <HiFolder style={{ color: "blue" }} />
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

export const LeafNode: React.FC<CustomNodeProps> = (props) => {
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
      {props.node.data.type && props.node.data.type.indexOf("link") == 0 && (
        <LinkNode
          node={props.node}
          collection={props.node.data.collection}
          reference={props.node.data.reference}
        />
      )}

      {props.node.data.type === "elective" ? (
        <HiBeaker style={{ color: "green" }} />
      ) : props.node.data.type === "constraint:program" ? (
        <HiLockClosed style={{ color: "red" }} />
      ) : (
        <HiDocument />
      )}

      <div className={styles.nodeInner}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <LeafEditor {...props} setVisibleInput={setVisibleInput} />
          </div>
        ) : (
          <div className={styles.inputWrapper}>
            <div
              style={{ cursor: "pointer" }}
              onClick={handleShowInput}
              className={styles.nodeLabel}
            >
              {props.node.data.type === "constraint:program"
                ? makeName(
                    props.all,
                    props.node.data.reference,
                    "Program Constraints"
                  )
                : props.node.data.type === "link:collection"
                ? props.tree.find((t) => t.id === parseInt(props.node.text))
                    ?.text +
                  (props.node.data.level
                    ? `, level ${props.node.data.level}`
                    : "")
                : props.node.data.type === "elective"
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
