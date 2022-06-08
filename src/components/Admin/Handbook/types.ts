import { NodeModel as TreeNodeModel } from '@minoru/react-dnd-treeview';

import { Selection } from 'generated/clientTypes';

export type NodeType =
  | "link:major"
  | "link:minor"
  | "link:program"
  | "link:collection"
  | "folder"
  | "subject"
  | "constraint:program"
  | "link:elective"
  | "collection";

export type FileProperties = {
  type?: NodeType;
  selection?: Selection;
  number?: number;
  credits?: number;
  level?: number;
  reference?: number;
  collection?: number;
  selector?: string;
  flagged?: boolean;
  dbId?: number;
  temp?: boolean;
};

export type TreeNode = {
  id: number;
  handbook: NodeModel[];
  code: string;
  name: string;
  url: string;
};

export declare type NodeModel = TreeNodeModel & { data: FileProperties };

export type NodeChange = (
  id: NodeModel["id"],
  value: Partial<FileProperties> & { text?: string; droppable?: boolean }
) => void;

export type CustomNodeProps = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  tree: NodeModel[];
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

export type Option = { name: string; value: number };
