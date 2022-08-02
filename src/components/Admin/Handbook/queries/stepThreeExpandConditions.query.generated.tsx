import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StepThreeExpandConditionsQueryVariables = Types.Exact<{
  handbook: Array<Types.HandbookInput> | Types.HandbookInput;
}>;


export type StepThreeExpandConditionsQuery = { __typename?: 'Query', stepThreeExpandConditions?: Array<Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }>> | null };


export const StepThreeExpandConditionsDocument = gql`
    query StepThreeExpandConditions($handbook: [HandbookInput!]!) {
  stepThreeExpandConditions(handbook: $handbook) {
    ...Handbook
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useStepThreeExpandConditionsQuery__
 *
 * To run a query within a React component, call `useStepThreeExpandConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStepThreeExpandConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStepThreeExpandConditionsQuery({
 *   variables: {
 *      handbook: // value for 'handbook'
 *   },
 * });
 */
export function useStepThreeExpandConditionsQuery(baseOptions: Apollo.QueryHookOptions<StepThreeExpandConditionsQuery, StepThreeExpandConditionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StepThreeExpandConditionsQuery, StepThreeExpandConditionsQueryVariables>(StepThreeExpandConditionsDocument, options);
      }
export function useStepThreeExpandConditionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StepThreeExpandConditionsQuery, StepThreeExpandConditionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StepThreeExpandConditionsQuery, StepThreeExpandConditionsQueryVariables>(StepThreeExpandConditionsDocument, options);
        }
export type StepThreeExpandConditionsQueryHookResult = ReturnType<typeof useStepThreeExpandConditionsQuery>;
export type StepThreeExpandConditionsLazyQueryHookResult = ReturnType<typeof useStepThreeExpandConditionsLazyQuery>;
export type StepThreeExpandConditionsQueryResult = Apollo.QueryResult<StepThreeExpandConditionsQuery, StepThreeExpandConditionsQueryVariables>;