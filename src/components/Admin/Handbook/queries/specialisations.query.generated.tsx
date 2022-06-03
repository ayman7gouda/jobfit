import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SpecialisationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SpecialisationsQuery = { __typename?: 'Query', specialisations: Array<{ __typename?: 'Specialisation', id: number, name: string, code: string, updated?: string | null }> };


export const SpecialisationsDocument = gql`
    query Specialisations {
  specialisations {
    id
    name
    code
    updated
  }
}
    `;

/**
 * __useSpecialisationsQuery__
 *
 * To run a query within a React component, call `useSpecialisationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialisationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialisationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSpecialisationsQuery(baseOptions?: Apollo.QueryHookOptions<SpecialisationsQuery, SpecialisationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpecialisationsQuery, SpecialisationsQueryVariables>(SpecialisationsDocument, options);
      }
export function useSpecialisationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpecialisationsQuery, SpecialisationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpecialisationsQuery, SpecialisationsQueryVariables>(SpecialisationsDocument, options);
        }
export type SpecialisationsQueryHookResult = ReturnType<typeof useSpecialisationsQuery>;
export type SpecialisationsLazyQueryHookResult = ReturnType<typeof useSpecialisationsLazyQuery>;
export type SpecialisationsQueryResult = Apollo.QueryResult<SpecialisationsQuery, SpecialisationsQueryVariables>;