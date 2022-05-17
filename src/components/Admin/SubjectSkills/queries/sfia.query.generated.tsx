import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SfiaQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type SfiaQuery = { __typename?: 'Query', sfia?: { __typename?: 'SfiaSkill', id: number, code: string, name: string, description: string, guidance: string, version: number, levels?: Array<{ __typename?: 'SfiaLevel', level?: number | null, description?: string | null }> | null } | null };


export const SfiaDocument = gql`
    query Sfia($id: Int!) {
  sfia(id: $id) {
    id
    code
    name
    description
    guidance
    version
    levels {
      level
      description
    }
  }
}
    `;

/**
 * __useSfiaQuery__
 *
 * To run a query within a React component, call `useSfiaQuery` and pass it any options that fit your needs.
 * When your component renders, `useSfiaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSfiaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSfiaQuery(baseOptions: Apollo.QueryHookOptions<SfiaQuery, SfiaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SfiaQuery, SfiaQueryVariables>(SfiaDocument, options);
      }
export function useSfiaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SfiaQuery, SfiaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SfiaQuery, SfiaQueryVariables>(SfiaDocument, options);
        }
export type SfiaQueryHookResult = ReturnType<typeof useSfiaQuery>;
export type SfiaLazyQueryHookResult = ReturnType<typeof useSfiaLazyQuery>;
export type SfiaQueryResult = Apollo.QueryResult<SfiaQuery, SfiaQueryVariables>;