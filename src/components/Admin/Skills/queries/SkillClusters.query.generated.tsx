import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SkillClustersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SkillClustersQuery = { __typename?: 'Query', skillClusters: Array<{ __typename?: 'SkillCluster', id: number, name: string, category: string, descriptions: Array<{ __typename?: 'SkillClusterDescription', id: number }> }> };


export const SkillClustersDocument = gql`
    query SkillClusters {
  skillClusters {
    id
    name
    category
    descriptions {
      id
    }
  }
}
    `;

/**
 * __useSkillClustersQuery__
 *
 * To run a query within a React component, call `useSkillClustersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillClustersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillClustersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillClustersQuery(baseOptions?: Apollo.QueryHookOptions<SkillClustersQuery, SkillClustersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillClustersQuery, SkillClustersQueryVariables>(SkillClustersDocument, options);
      }
export function useSkillClustersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillClustersQuery, SkillClustersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillClustersQuery, SkillClustersQueryVariables>(SkillClustersDocument, options);
        }
export type SkillClustersQueryHookResult = ReturnType<typeof useSkillClustersQuery>;
export type SkillClustersLazyQueryHookResult = ReturnType<typeof useSkillClustersLazyQuery>;
export type SkillClustersQueryResult = Apollo.QueryResult<SkillClustersQuery, SkillClustersQueryVariables>;