import { NodeModel } from "@minoru/react-dnd-treeview";

export type FileProperties = {
  type?: string;
  number?: string;
  credits?: string;
  level?: string;
  flagged?: boolean;
  dbId?: number;
};

let guid = 10;

export function initGuid(program: any) {
  if (program.clean) {
    guid = Math.max(...program.clean.map((c: any) => parseInt(c.id))) + 1;
    console.log("GUID: " + guid);
  } else {
    guid = 10;
  }
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
