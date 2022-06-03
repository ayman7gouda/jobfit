import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProgramsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProgramsQuery = { __typename?: 'Query', programs: Array<{ __typename?: 'Program', id: number, name: string, code: string, updated?: string | null }> };


export const ProgramsDocument = gql`
    query Programs {
  programs {
    id
    name
    code
    updated
  }
}
    `;

/**
 * __useProgramsQuery__
 *
 * To run a query within a React component, call `useProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramsQuery(baseOptions?: Apollo.QueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, options);
      }
export function useProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, options);
        }
export type ProgramsQueryHookResult = ReturnType<typeof useProgramsQuery>;
export type ProgramsLazyQueryHookResult = ReturnType<typeof useProgramsLazyQuery>;
export type ProgramsQueryResult = Apollo.QueryResult<ProgramsQuery, ProgramsQueryVariables>;