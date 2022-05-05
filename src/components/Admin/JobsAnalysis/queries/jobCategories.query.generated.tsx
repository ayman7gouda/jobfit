import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JobCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type JobCategoriesQuery = { __typename?: 'Query', jobCategories: Array<{ __typename?: 'JobCategory', name: string, id: number, count: number, avg: number, min: number, max: number }> };


export const JobCategoriesDocument = gql`
    query JobCategories {
  jobCategories {
    name
    id
    count
    avg
    min
    max
  }
}
    `;

/**
 * __useJobCategoriesQuery__
 *
 * To run a query within a React component, call `useJobCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useJobCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<JobCategoriesQuery, JobCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobCategoriesQuery, JobCategoriesQueryVariables>(JobCategoriesDocument, options);
      }
export function useJobCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobCategoriesQuery, JobCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobCategoriesQuery, JobCategoriesQueryVariables>(JobCategoriesDocument, options);
        }
export type JobCategoriesQueryHookResult = ReturnType<typeof useJobCategoriesQuery>;
export type JobCategoriesLazyQueryHookResult = ReturnType<typeof useJobCategoriesLazyQuery>;
export type JobCategoriesQueryResult = Apollo.QueryResult<JobCategoriesQuery, JobCategoriesQueryVariables>;