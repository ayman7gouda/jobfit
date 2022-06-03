import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
export type HandbookFragment = { __typename?: 'Handbook', id: number, number?: number | null, credits?: number | null, level?: number | null, flagged?: boolean | null, nodeId: number, programId?: number | null, parentId?: number | null, text?: string | null, folder?: boolean | null, type?: string | null };

export const HandbookFragmentDoc = gql`
    fragment Handbook on Handbook {
  id
  number
  credits
  level
  flagged
  nodeId
  programId
  parentId
  text
  folder
  type
}
    `;