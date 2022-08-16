import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StepOneExpandCollectionsQueryVariables = Types.Exact<{
  programId: Types.Scalars['Int'];
  handbook: Array<Types.HandbookInput> | Types.HandbookInput;
}>;


export type StepOneExpandCollectionsQuery = { __typename?: 'Query', stepOneExpandCollections?: { __typename?: 'CombinationsResult', combinations: Array<Array<number>>, handbook: Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }> } | null };


export const StepOneExpandCollectionsDocument = gql`
    query StepOneExpandCollections($programId: Int!, $handbook: [HandbookInput!]!) {
  stepOneExpandCollections(programId: $programId, handbook: $handbook) {
    handbook {
      ...Handbook
    }
    combinations
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useStepOneExpandCollectionsQuery__
 *
 * To run a query within a React component, call `useStepOneExpandCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStepOneExpandCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStepOneExpandCollectionsQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *      handbook: // value for 'handbook'
 *   },
 * });
 */
export function useStepOneExpandCollectionsQuery(baseOptions: Apollo.QueryHookOptions<StepOneExpandCollectionsQuery, StepOneExpandCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StepOneExpandCollectionsQuery, StepOneExpandCollectionsQueryVariables>(StepOneExpandCollectionsDocument, options);
      }
export function useStepOneExpandCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StepOneExpandCollectionsQuery, StepOneExpandCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StepOneExpandCollectionsQuery, StepOneExpandCollectionsQueryVariables>(StepOneExpandCollectionsDocument, options);
        }
export type StepOneExpandCollectionsQueryHookResult = ReturnType<typeof useStepOneExpandCollectionsQuery>;
export type StepOneExpandCollectionsLazyQueryHookResult = ReturnType<typeof useStepOneExpandCollectionsLazyQuery>;
export type StepOneExpandCollectionsQueryResult = Apollo.QueryResult<StepOneExpandCollectionsQuery, StepOneExpandCollectionsQueryVariables>;