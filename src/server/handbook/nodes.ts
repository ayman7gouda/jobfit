import { CollectionNode } from './CollectionNode';
import { FolderNode } from './FolderNode';
import { SubjectNode } from './SubjectNode';

import type { HandbookNode } from "./HandbookNode";
import type { ClientHandbook, Pathway, ProcessingState } from "./types";

function instantiate(
  h: ClientHandbook,
  nodes: ClientHandbook[],
  externals: Map<number, Pathway[]>
): HandbookNode {
  switch (h.type) {
    case "folder":
      return new FolderNode(h, nodes, externals);
    case "subject":
      return new SubjectNode(h, nodes, externals);
    case "collection":
      return new CollectionNode(h, nodes, externals);
    case "link:collection":
      return new CollectionNode(h, nodes, externals);
    case "link:major":
      return new MajorNode(h, nodes, externals);
  }
  throw new Error("Not supported: " + h.type);
}

export const NodeFactory = {
  init() {
    this.cache = new Map();
  },
  cache: new Map<number, HandbookNode>(),
  create(
    node: ClientHandbook,
    nodes: ClientHandbook[],
    externals: Map<number, Pathway[]>
  ): HandbookNode {
    if (!this.cache.has(node.id)) {
      this.cache.set(node.id, instantiate(node, nodes, externals));
    }
    return this.cache.get(node.id)!;
  },
};
