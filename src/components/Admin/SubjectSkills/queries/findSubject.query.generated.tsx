import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindSubjectSkillsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type FindSubjectSkillsQuery = { __typename?: 'Query', findSubjectSkills?: { __typename?: 'Subject', id: number, code: string, name: string, handbook: string, los: string, losIntro: string, readingList: string, sfiaEstimates?: Array<{ __typename?: 'SfiaEstimate', id: number, l1?: number | null, l2?: number | null, l3?: number | null, l4?: number | null, l5?: number | null, l6?: number | null, l7?: number | null, rank?: number | null, sfiaId: number, overall: number }> | null, sfia?: Array<{ __typename?: 'SubjectSfiaSkill', id: number, sfiaId: number, level: number }> | null } | null };


export const FindSubjectSkillsDocument = gql`
    query FindSubjectSkills($id: Int!) {
  findSubjectSkills(id: $id) {
    id
    code
    name
    handbook
    los
    losIntro
    readingList
    sfiaEstimates {
      id
      l1
      l2
      l3
      l4
      l5
      l6
      l7
      rank
      sfiaId
      overall
    }
    sfia {
      id
      sfiaId
      level
    }
  }
}
    `;

/**
 * __useFindSubjectSkillsQuery__
 *
 * To run a query within a React component, call `useFindSubjectSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSubjectSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSubjectSkillsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindSubjectSkillsQuery(baseOptions: Apollo.QueryHookOptions<FindSubjectSkillsQuery, FindSubjectSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSubjectSkillsQuery, FindSubjectSkillsQueryVariables>(FindSubjectSkillsDocument, options);
      }
export function useFindSubjectSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSubjectSkillsQuery, FindSubjectSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSubjectSkillsQuery, FindSubjectSkillsQueryVariables>(FindSubjectSkillsDocument, options);
        }
export type FindSubjectSkillsQueryHookResult = ReturnType<typeof useFindSubjectSkillsQuery>;
export type FindSubjectSkillsLazyQueryHookResult = ReturnType<typeof useFindSubjectSkillsLazyQuery>;
export type FindSubjectSkillsQueryResult = Apollo.QueryResult<FindSubjectSkillsQuery, FindSubjectSkillsQueryVariables>;