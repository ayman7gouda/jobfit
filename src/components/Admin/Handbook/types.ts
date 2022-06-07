import { NodeModel } from "@minoru/react-dnd-treeview";

export type FileProperties = {
  type?: string;
  number?: string;
  credits?: string;
  reference?: string;
  level?: string;
  flagged?: boolean;
  dbId?: number;
};

export type Option = { name: string; value: string };

let guid = 10;

export function initGuid(nodes: NodeModel<FileProperties>[]) {
  guid = Math.max(...nodes.map((c: any) => parseInt(c.id))) + 1;
  console.log("GUID: " + guid);
}

export function getGuid() {
  return guid++;
}

export type TreeNode = {
  id: number;
  handbook: NodeModel<FileProperties>[];
  code: string;
  name: string;
  url: string;
};
