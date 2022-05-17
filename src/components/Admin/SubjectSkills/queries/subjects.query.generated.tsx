import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindSubjectsQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type FindSubjectsQuery = { __typename?: 'Query', findSubjects: Array<{ __typename?: 'Subject', id: number, code: string, name: string, handbook: string }> };


export const FindSubjectsDocument = gql`
    query FindSubjects($query: String!) {
  findSubjects(query: $query) {
    id
    code
    name
    handbook
  }
}
    `;

/**
 * __useFindSubjectsQuery__
 *
 * To run a query within a React component, call `useFindSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSubjectsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFindSubjectsQuery(baseOptions: Apollo.QueryHookOptions<FindSubjectsQuery, FindSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSubjectsQuery, FindSubjectsQueryVariables>(FindSubjectsDocument, options);
      }
export function useFindSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSubjectsQuery, FindSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSubjectsQuery, FindSubjectsQueryVariables>(FindSubjectsDocument, options);
        }
export type FindSubjectsQueryHookResult = ReturnType<typeof useFindSubjectsQuery>;
export type FindSubjectsLazyQueryHookResult = ReturnType<typeof useFindSubjectsLazyQuery>;
export type FindSubjectsQueryResult = Apollo.QueryResult<FindSubjectsQuery, FindSubjectsQueryVariables>;