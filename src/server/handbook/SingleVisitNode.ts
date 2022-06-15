import { HandbookNode } from './HandbookNode';
import { ClientHandbook, Pathway, ProcessingState } from './types';

export class SingleVisitNode extends HandbookNode {
  isVisited = false;

  constructor(
    node: ClientHandbook,
    nodes: ClientHandbook[],
    externals: Map<number, Pathway[]>
  ) {
    super(node, nodes, externals);
  }

  process(state: ProcessingState) {
    if (this.isVisited) {
      throw new Error(
        `You have a loop in pathway "${state.currentPathway.name}", processing "${this.node.text} [${this.node.id}]"`
      );
    }
    this.isVisited = true;
  }
}
