import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProgramQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ProgramQuery = { __typename?: 'Query', program?: { __typename?: 'Program', id: number, name: string, code: string, url: string, description?: string | null, structureSource?: string | null, sequenceSource?: string | null, updated?: string | null, handbook?: Array<{ __typename?: 'Handbook', id: number, number?: number | null, credits?: number | null, level?: number | null, flagged?: boolean | null, nodeId: number, programId?: number | null, parentId?: number | null, text?: string | null, folder?: boolean | null, type?: string | null, reference?: number | null }> | null } | null };


export const ProgramDocument = gql`
    query Program($id: Int!) {
  program(id: $id) {
    id
    name
    code
    url
    description
    structureSource
    sequenceSource
    handbook {
      ...Handbook
    }
    updated
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useProgramQuery__
 *
 * To run a query within a React component, call `useProgramQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProgramQuery(baseOptions: Apollo.QueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, options);
      }
export function useProgramLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, options);
        }
export type ProgramQueryHookResult = ReturnType<typeof useProgramQuery>;
export type ProgramLazyQueryHookResult = ReturnType<typeof useProgramLazyQuery>;
export type ProgramQueryResult = Apollo.QueryResult<ProgramQuery, ProgramQueryVariables>;