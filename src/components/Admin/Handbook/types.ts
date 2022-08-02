import { NodeModel as TreeNodeModel } from '@minoru/react-dnd-treeview';

import { NodeType, Selection } from 'generated/clientTypes';

export type FileProperties = {
  type?: NodeType;
  selection?: Selection;
  number?: number;
  maxNumber?: number;
  credits?: number;
  level?: number;
  reference?: number;
  collection?: number;
  selector?: string;
  flagged?: boolean;
  dbId?: number;
  temp?: boolean;
  subjectCode?: string;
  subjectName?: string;
};

export type TreeNode = {
  id: number;
  handbook: NodeModel[];
  code: string;
  name: string;
  url: string;
};

export declare type NodeModel = TreeNodeModel & {
  id: number;
  index?: number;
  data: FileProperties;
};

export type NodeChange = (
  id: NodeModel["id"],
  value: Partial<FileProperties> & { text?: string; droppable?: boolean }
) => void;

export type CustomNodeProps = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  tree: NodeModel[];
  importRootId: number | undefined;
  setImportRootId(num: number | undefined): void;
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
  onNodeChange: NodeChange;
  clone: (id: NodeModel["id"]) => void;
  onAddNode: (node: NodeModel | Array<NodeModel>, insert?: boolean) => void;
  onDeleteNode: (id: number, handleChildren?: "delete" | "copy") => void;
  programs: Option[];
  majors: Option[];
  minors: Option[];
  all: Option[];
};

export type CustomNodeChildProps = CustomNodeProps & {
  visibleInput: boolean;
  setVisibleInput(value: boolean): void;
};

export type Option = { name: string; value: number };
