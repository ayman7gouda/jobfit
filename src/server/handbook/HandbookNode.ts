import type {
  ClientHandbook,
  Pathway,
  ProcessingState,
  Sequence,
} from "./types";

export abstract class HandbookNode {
  constructor(
    public node: ClientHandbook,
    nodes: ClientHandbook[],
    externals: Map<number, Pathway[]>
  ) {
    if (node.id === node.parentId) {
      throw new Error("Invalid node: Parent id and node id is the same!");
    }
  }

  abstract expand(
    parentSequence: Sequence,
    nodes: HandbookNode[],
    handbook: HandbookNode[],
    externals: Map<number, Pathway[]>
  ): Sequence[];

  abstract process(state: ProcessingState): void;
}
