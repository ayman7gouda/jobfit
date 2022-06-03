import {
  DndProvider,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";

import { TreeView } from "./TreeView";

export function PreviewTree() {
  return (
    <DndProvider
      backend={MultiBackend}
      debugMode={true}
      options={getBackendOptions()}
    >
      <TreeView />
    </DndProvider>
  );
}
