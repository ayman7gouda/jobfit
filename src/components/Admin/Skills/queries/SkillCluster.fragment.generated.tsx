import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
export type SkillClusterFragment = { __typename?: 'SkillCluster', name: string, category: string, id: number, descriptions: Array<{ __typename?: 'SkillClusterDescription', id: number, source: string, name: string, description: string }> };

export const SkillClusterFragmentDoc = gql`
    fragment SkillCluster on SkillCluster {
  name
  category
  id
  descriptions {
    id
    source
    name
    description
  }
}
    `;