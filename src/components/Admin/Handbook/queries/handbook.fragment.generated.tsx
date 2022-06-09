import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
export type HandbookFragment = { __typename?: 'Handbook', id: number, nodeId: number, parentId?: number | null, text?: string | null, folder?: boolean | null, type?: string | null, selection?: Types.Selection | null, number?: number | null, credits?: number | null, level?: number | null, reference?: number | null, collection?: number | null, flagged?: boolean | null, selector?: string | null, index?: number | null, subjectCode?: string | null, subjectName?: string | null, maxNumber?: number | null };

export const HandbookFragmentDoc = gql`
    fragment Handbook on Handbook {
  id
  nodeId
  parentId
  text
  folder
  type
  selection
  number
  credits
  level
  reference
  collection
  flagged
  selector
  index
  subjectCode
  subjectName
  maxNumber
}
    `;