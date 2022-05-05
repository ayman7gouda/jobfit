import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { SkillClusterFragmentDoc } from './SkillCluster.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SkillDetailsQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SkillDetailsQuery = { __typename?: 'Query', skillCluster?: { __typename?: 'SkillCluster', name: string, category: string, id: number, skills?: Array<{ __typename?: 'SkillClusters', skill?: { __typename?: 'Skill', id: number, name: string } | null }> | null, descriptions: Array<{ __typename?: 'SkillClusterDescription', id: number, source: string, name: string, description: string }> } | null };


export const SkillDetailsDocument = gql`
    query SkillDetails($id: Int) {
  skillCluster(id: $id) {
    ...SkillCluster
    skills {
      skill {
        id
        name
      }
    }
  }
}
    ${SkillClusterFragmentDoc}`;

/**
 * __useSkillDetailsQuery__
 *
 * To run a query within a React component, call `useSkillDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSkillDetailsQuery(baseOptions?: Apollo.QueryHookOptions<SkillDetailsQuery, SkillDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillDetailsQuery, SkillDetailsQueryVariables>(SkillDetailsDocument, options);
      }
export function useSkillDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillDetailsQuery, SkillDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillDetailsQuery, SkillDetailsQueryVariables>(SkillDetailsDocument, options);
        }
export type SkillDetailsQueryHookResult = ReturnType<typeof useSkillDetailsQuery>;
export type SkillDetailsLazyQueryHookResult = ReturnType<typeof useSkillDetailsLazyQuery>;
export type SkillDetailsQueryResult = Apollo.QueryResult<SkillDetailsQuery, SkillDetailsQueryVariables>;