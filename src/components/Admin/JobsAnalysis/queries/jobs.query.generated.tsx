import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JobsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type JobsQuery = { __typename?: 'Query', jobs?: Array<{ __typename?: 'Job', id: number, title?: string | null, minAnnualSalary?: number | null, dateText?: string | null, city?: string | null, state?: string | null, country?: string | null, skills: Array<{ __typename?: 'JobSkills', skill?: { __typename?: 'Skill', name: string, id: number, clusters?: Array<{ __typename?: 'SkillClusters', cluster?: { __typename?: 'SkillCluster', id: number, name: string } | null }> | null } | null }> }> | null };


export const JobsDocument = gql`
    query Jobs($id: Int!) {
  jobs(id: $id) {
    id
    title
    minAnnualSalary
    dateText
    city
    state
    country
    skills {
      skill {
        name
        id
        clusters {
          cluster {
            id
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobsQuery(baseOptions: Apollo.QueryHookOptions<JobsQuery, JobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
      }
export function useJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
        }
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = Apollo.QueryResult<JobsQuery, JobsQueryVariables>;