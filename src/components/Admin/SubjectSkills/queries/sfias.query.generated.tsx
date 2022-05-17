import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllSfiaQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllSfiaQuery = { __typename?: 'Query', sfias: Array<{ __typename?: 'SfiaSkill', id: number, code: string, name: string }> };


export const AllSfiaDocument = gql`
    query AllSfia {
  sfias {
    id
    code
    name
  }
}
    `;

/**
 * __useAllSfiaQuery__
 *
 * To run a query within a React component, call `useAllSfiaQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSfiaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSfiaQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSfiaQuery(baseOptions?: Apollo.QueryHookOptions<AllSfiaQuery, AllSfiaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSfiaQuery, AllSfiaQueryVariables>(AllSfiaDocument, options);
      }
export function useAllSfiaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSfiaQuery, AllSfiaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSfiaQuery, AllSfiaQueryVariables>(AllSfiaDocument, options);
        }
export type AllSfiaQueryHookResult = ReturnType<typeof useAllSfiaQuery>;
export type AllSfiaLazyQueryHookResult = ReturnType<typeof useAllSfiaLazyQuery>;
export type AllSfiaQueryResult = Apollo.QueryResult<AllSfiaQuery, AllSfiaQueryVariables>;