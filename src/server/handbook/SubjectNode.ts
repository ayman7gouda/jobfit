import { HandbookNode } from './HandbookNode';
import { ProcessingState } from './types';

export class SubjectNode extends HandbookNode {
  process(state: ProcessingState) {
    state.currentPathway.credits += 10;
    state.currentPathway.sequence.push({
      code: this.node.subjectCode!,
      name: this.node.subjectName!,
      credits: this.node.credits || 10,
    });
  }
}
