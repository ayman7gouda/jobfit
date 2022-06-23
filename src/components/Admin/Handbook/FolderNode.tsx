import { toUrlName } from 'lib/utils';
import {
  HiBan, HiBeaker, HiChevronDown, HiChevronRight, HiCollection, HiDuplicate, HiFolder, HiLibrary,
  HiLink, HiLockClosed, HiPencil, HiTrash
} from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { FolderEditor } from './FolderEditor';
import { IconButton } from './shared';
import { CustomNodeChildProps, CustomNodeProps, NodeModel } from './types';

type ParentStructure = { parent: NodeModel; child: NodeModel };

function findParent(node: NodeModel, props: CustomNodeProps): NodeModel {
  return props.tree.find((n) => n.id === node.parent)!;
}

function findParents(node: NodeModel, props: CustomNodeProps): number[] {
  let parents = [];
  while (node && node.data.type !== "program" && node.parent) {
    parents.push(node.parent as number);
    node = findParent(node, props);
  }
  return parents;
}

function findParentsAndChildren(
  node: NodeModel,
  props: CustomNodeProps
): ParentStructure[] {
  let parents: ParentStructure[] = [];
  while (node && node.data.type !== "program" && node.parent) {
    let p = props.tree.find((n) => n.id === node.parent)!;
    parents.push({ parent: p, child: node });
    node = p;
  }
  return parents;
}

function renderOrder(props: CustomNodeProps) {
  let parents = findParents(props.node, props);

  let nodes = props.tree.filter(
    (t) =>
      t.data.type === props.node.data.type &&
      t.data.reference === props.node.data.reference &&
      t.data.collection === props.node.data.collection &&
      t.data.selector === props.node.data.selector
  );
  let nodeParents: { [index: string]: ParentStructure[] } = {};

  nodes.forEach((n) => (nodeParents[n.id] = findParentsAndChildren(n, props)));

  // filter only nodes which are in the same program
  nodes = nodes.filter((n) =>
    nodeParents[n.id].some((p) => parents.indexOf(p.parent?.id as number) >= 0)
  );

  nodes.sort((a, b) => {
    let parentA: ParentStructure = nodeParents[a.id].find((ap) =>
      nodeParents[b.id].some((bp) => ap.parent.id === bp.parent.id)
    )!;
    let parentB: ParentStructure = nodeParents[b.id].find((bp) =>
      nodeParents[a.id].some((ap) => ap.parent.id === bp.parent.id)
    )!;

    return parentA.child.index! < parentB.child.index! ? -1 : 1;
  });

  // find the current index
  let index = nodes.indexOf(props.node);

  // calculate the beginning

  let order = 0;

  for (let i = 0; i < index; i++) {
    order += nodes[i].data.number || 0;
  }

  // now generate the text
  let text = "";
  for (let i = 0; i < (props.node.data.number || 0); i++) {
    order += 1;

    // if (order == 0) {
    //   text += "1<sup>st</sup>";
    // } else if (order === 1) {
    //   text += "2<sup>nd</sup>";
    // } else if (order === 2) {
    //   text += "3<sup>rd</sup>";
    // } else {
    //   text += order + 1 + "<sup>th</sup>";
    // }

    text += order;
    if (i < (props.node.data.number || 0) - 1) {
      text += ", ";
    }
  }
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

export const FolderNode: React.FC<CustomNodeChildProps> = (props) => {
  const { id } = props.node;

  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    props.setVisibleInput(true);
  };

  const color = props.node.data.selection === "AND" ? "salmon" : "green";
  const children = props.tree.filter(
    (t) => t.parent === props.node.id && t?.data.type === "constraint:program"
  );
  const isConstraint = children.length > 1;

  return (
    <div
      className={styles.root + " " + styles.buttons}
      title={JSON.stringify(props.node, null, 4)}
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
      {isConstraint ? (
        <HiLockClosed style={{ color: "red" }} />
      ) : props.node.data.type === "link:elective" ? (
        <HiBeaker style={{ color: "green" }} />
      ) : props.node.data.type === "link:collection" ? (
        <HiLink style={{ color: "purple" }} />
      ) : props.node.data.type === "link:program" ? (
        <HiLink style={{ color: "orange" }} />
      ) : props.node.data.type === "link:major" ? (
        <HiLink style={{ color: "blue" }} />
      ) : props.node.data.type === "link:minor" ? (
        <HiLink style={{ color: "darkgoldenrod" }} />
      ) : props.node.data.type === "collection" ? (
        <HiCollection style={{ color }} />
      ) : props.node.data.type === "program" ? (
        <HiLibrary style={{ color: "blue" }} />
      ) : props.node.data.type === "folder" ? (
        <HiFolder style={{ color }} />
      ) : (
        <HiBan
          style={{ color: "red" }}
          title={`Unexpected type: ${props.node.data.type}`}
        />
      )}

      <div className={styles.nodeInner}>
        {props.visibleInput ? (
          <FolderEditor {...props} />
        ) : (
          <div className={styles.inputWrapper}>
            {props.node.data.type !== "folder" &&
              props.node.data.selection === "AND" && (
                <div className="flex">
                  <div
                    className="bg-red-700 font-bold px-2 py-1 rounded-l-lg nowrap text-white text-xs"
                    style={{}}
                  >
                    All
                  </div>
                  <div
                    className="bg-red-500 px-2 py-1 mr-1 rounded-r-lg nowrap text-white text-xs"
                    style={{}}
                  >
                    {props.node.data.type === "collection"
                      ? " from the collection"
                      : props.node.data.type === "program"
                      ? "of the program"
                      : " of the"}
                  </div>
                </div>
              )}
            {props.node.data.selection === "OR" && (
              <div className="flex">
                <div
                  className="bg-green-700 font-bold px-2 py-1 rounded-l-lg nowrap text-white text-xs"
                  style={{}}
                >
                  {props.node.data.maxNumber != null &&
                    props.node.data.number != 0 &&
                    "Min "}
                  {props.node.data.number == 0
                    ? props.node.data.maxNumber == null
                      ? "Any"
                      : ""
                    : props.node.data.number}
                  {props.node.data.maxNumber
                    ? ` Max ${props.node.data.maxNumber}`
                    : null}

                  {(props.node.data.number && props.node.data.number > 10) ||
                  (props.node.data.maxNumber && props.node.data.maxNumber > 10)
                    ? " credits"
                    : ""}
                </div>
                <div
                  className="bg-green-500 px-2 py-1 mr-1 rounded-r-lg nowrap text-white text-xs"
                  style={{}}
                >
                  {props.node.data.type === "collection"
                    ? " from the collection"
                    : " from the"}
                </div>
              </div>
            )}
            {!!props.node.data.number &&
              props.node.data.number < 10 &&
              props.node.data.type?.indexOf("link") == 0 &&
              findParent(props.node, props).data.type !== "collection" &&
              findParent(props.node, props).data.selection !== "OR" && (
                <div
                  className="bg-orange-300 mr-1 font-bold px-2 py-1 rounded-lg nowrap text-white text-xs"
                  style={{}}
                >
                  {renderOrder(props)}
                </div>
              )}
            {(props.node.text ||
              props.node.data.type === "link:collection") && (
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
            )}
            <div className={styles.dynamic}>
              <IconButton onClick={handleShowInput}>
                <HiPencil />
              </IconButton>
              <IconButton
                title="Clone Node"
                className="bg-green-800"
                onClick={() => props.clone(id)}
              >
                <HiDuplicate />
              </IconButton>
              {(props.node.data.type === "link:major" ||
                props.node.data.type === "link:minor") && (
                <a
                  href={`/admin/handbook/specialisations/${toUrlName(
                    props.node.text
                  )}?id=${props.node.data.reference}`}
                  target="__blank"
                >
                  <IconButton>
                    <HiLink />
                  </IconButton>
                </a>
              )}
              {props.node.data.type === "link:program" && (
                <a
                  href={`/admin/handbook/program/${toUrlName(
                    props.node.text
                  )}?id=${props.node.data.reference}`}
                  target="__blank"
                >
                  <IconButton>
                    <HiLink />
                  </IconButton>
                </a>
              )}
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
