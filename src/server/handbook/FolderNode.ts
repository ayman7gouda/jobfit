import { HandbookNode } from './HandbookNode';
import { NodeFactory } from './nodes';
import { combinations } from './shared';
import { SingleVisitNode } from './SingleVisitNode';
import { ClientHandbook, Pathway, ProcessingState } from './types';

export class FolderNode extends SingleVisitNode {
  children: HandbookNode[] = [];

  constructor(
    node: ClientHandbook,
    nodes: ClientHandbook[],
    externals: Map<number, Pathway[]>
  ) {
    super(node, nodes, externals);

    // validate
    if (node.selection !== "AND" && node.selection !== "OR") {
      throw new Error('Folder node must have selection "AND" or "OR"');
    }

    // create all children nodes
    for (let child of nodes.filter((n) => n.parentId === node.id)) {
      this.children.push(NodeFactory.create(child, nodes, externals));
    }

    // sort children, first folders then by index
    this.children.sort((a, b) => (a.node.index! < b.node.index! ? -1 : 1));
  }

  process(state: ProcessingState) {
    super.process(state);

    state.currentPathway.sequence.push({
      text: this.node.text!,
    });

    // this is either AND or OR type of node
    if (this.node.selection === "AND") {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].process(state);
      }
    }
    if (this.node.selection === "OR") {
      let min = this.node.number;
      let max = this.node.maxNumber;

      if (min && min >= 10) {
        min /= 10;
      }
      if (max && max >= 10) {
        max /= 10;
      }

      let combinations = this.select(min, max);

      let startPathway: Pathway = {
        ...state.currentPathway,
        sequence: [...state.currentPathway.sequence],
      };

      // remove the original pathway from the collection
      state.pathways.splice(state.pathways.indexOf(state.currentPathway), 1);

      // now generate new pathways
      for (let combination of combinations) {
        let currentPathway = {
          ...startPathway,
          sequence: [...startPathway.sequence],
        };

        // add this new pathway to the mix
        state.pathways.push(currentPathway);

        // use the new child state
        let childState: ProcessingState = {
          ...state,
          currentPathway,
        };

        // process the combination nodes with the new state
        for (let node of combination) {
          node.process(childState);
        }
      }
    }
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
