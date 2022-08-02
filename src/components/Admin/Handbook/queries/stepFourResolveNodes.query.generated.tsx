import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StepFourResolveNodesQueryVariables = Types.Exact<{
  handbook: Array<Types.HandbookInput> | Types.HandbookInput;
}>;


export type StepFourResolveNodesQuery = { __typename?: 'Query', stepFourResolveNodes?: Array<Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }>> | null };


export const StepFourResolveNodesDocument = gql`
    query StepFourResolveNodes($handbook: [HandbookInput!]!) {
  stepFourResolveNodes(handbook: $handbook) {
    ...Handbook
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useStepFourResolveNodesQuery__
 *
 * To run a query within a React component, call `useStepFourResolveNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStepFourResolveNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStepFourResolveNodesQuery({
 *   variables: {
 *      handbook: // value for 'handbook'
 *   },
 * });
 */
export function useStepFourResolveNodesQuery(baseOptions: Apollo.QueryHookOptions<StepFourResolveNodesQuery, StepFourResolveNodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StepFourResolveNodesQuery, StepFourResolveNodesQueryVariables>(StepFourResolveNodesDocument, options);
      }
export function useStepFourResolveNodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StepFourResolveNodesQuery, StepFourResolveNodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StepFourResolveNodesQuery, StepFourResolveNodesQueryVariables>(StepFourResolveNodesDocument, options);
        }
export type StepFourResolveNodesQueryHookResult = ReturnType<typeof useStepFourResolveNodesQuery>;
export type StepFourResolveNodesLazyQueryHookResult = ReturnType<typeof useStepFourResolveNodesLazyQuery>;
export type StepFourResolveNodesQueryResult = Apollo.QueryResult<StepFourResolveNodesQuery, StepFourResolveNodesQueryVariables>;