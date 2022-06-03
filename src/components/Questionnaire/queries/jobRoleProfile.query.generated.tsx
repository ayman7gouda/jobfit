import * as Types from '../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JobRoleProfileQueryVariables = Types.Exact<{
  unit: Types.Scalars['Int'];
}>;


export type JobRoleProfileQuery = { __typename?: 'Query', jobRoleProfile?: { __typename?: 'JobRoleProfile', name?: string | null, average?: number | null, demand?: string | null, description?: string | null, jobCount?: number | null, projection?: number | null, maxSalary?: number | null, minSalary?: number | null, employers: Array<{ __typename?: 'EmployerCount', count?: number | null, name?: string | null }>, skills: Array<{ __typename?: 'JobProfileSkillCategory', clusterId?: number | null, count?: number | null, name?: string | null, skills: Array<{ __typename?: 'JobProfileSkill', skillId?: number | null, count?: number | null, name?: string | null }> }> } | null };


export const JobRoleProfileDocument = gql`
    query JobRoleProfile($unit: Int!) {
  jobRoleProfile(unit: $unit) {
    name
    average
    demand
    description
    employers {
      count
      name
    }
    jobCount
    projection
    maxSalary
    minSalary
    skills {
      clusterId
      count
      name
      skills {
        skillId
        count
        name
      }
    }
  }
}
    `;

/**
 * __useJobRoleProfileQuery__
 *
 * To run a query within a React component, call `useJobRoleProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobRoleProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobRoleProfileQuery({
 *   variables: {
 *      unit: // value for 'unit'
 *   },
 * });
 */
export function useJobRoleProfileQuery(baseOptions: Apollo.QueryHookOptions<JobRoleProfileQuery, JobRoleProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobRoleProfileQuery, JobRoleProfileQueryVariables>(JobRoleProfileDocument, options);
      }
export function useJobRoleProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobRoleProfileQuery, JobRoleProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobRoleProfileQuery, JobRoleProfileQueryVariables>(JobRoleProfileDocument, options);
        }
export type JobRoleProfileQueryHookResult = ReturnType<typeof useJobRoleProfileQuery>;
export type JobRoleProfileLazyQueryHookResult = ReturnType<typeof useJobRoleProfileLazyQuery>;
export type JobRoleProfileQueryResult = Apollo.QueryResult<JobRoleProfileQuery, JobRoleProfileQueryVariables>;