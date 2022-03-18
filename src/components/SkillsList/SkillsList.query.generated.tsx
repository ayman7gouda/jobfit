import * as Types from '../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SkillsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SkillsListQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'Skill', id: string, name: string, description: string }> };


export const SkillsListDocument = gql`
    query SkillsList {
  skills {
    id
    name
    description
  }
}
    `;

/**
 * __useSkillsListQuery__
 *
 * To run a query within a React component, call `useSkillsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsListQuery(baseOptions?: Apollo.QueryHookOptions<SkillsListQuery, SkillsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillsListQuery, SkillsListQueryVariables>(SkillsListDocument, options);
      }
export function useSkillsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsListQuery, SkillsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillsListQuery, SkillsListQueryVariables>(SkillsListDocument, options);
        }
export type SkillsListQueryHookResult = ReturnType<typeof useSkillsListQuery>;
export type SkillsListLazyQueryHookResult = ReturnType<typeof useSkillsListLazyQuery>;
export type SkillsListQueryResult = Apollo.QueryResult<SkillsListQuery, SkillsListQueryVariables>;