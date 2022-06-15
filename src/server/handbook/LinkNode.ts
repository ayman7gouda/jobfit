import { HandbookNode } from './HandbookNode';
import { combinations } from './shared';
import { ClientHandbook, Pathway } from './types';

export class LinkNode extends HandbookNode {
  children: Pathway[] = [];

  constructor(
    node: ClientHandbook,
    nodes: ClientHandbook[],
    externals: Map<number, Pathway[]>
  ) {
    super(node, nodes, externals);

    if (node.reference == null) {
      throw new Error("Link node must specify a reference!");
    }
    if (!externals.has(node.reference)) {
      throw new Error(
        "There is no external handbook info with this id: " + node.reference
      );
    }

    this.children = externals.get(node.reference)!;
  }

  select(
    min: number | null | undefined,
    max: number | null | undefined
  ): HandbookNode[][] {
    let result: HandbookNode[][] = [];
    // if this is exact selection
    if (min && !max) {
      for (const combo of combinations(this.children, min)) {
        result.push(combo);
      }
    }
    return result;
  }
}
