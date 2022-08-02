import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
export type HandbookFragment = { __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType };

export const HandbookFragmentDoc = gql`
    fragment Handbook on Handbook {
  credits
  flagged
  folder
  id
  index
  level
  maxNumber
  nodeId
  number
  parentId
  reference
  selection
  selector
  subjectCode
  subjectName
  text
  type
}
    `;