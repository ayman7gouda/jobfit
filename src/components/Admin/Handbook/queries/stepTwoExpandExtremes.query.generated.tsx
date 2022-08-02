import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StepTwoExpandExtremesQueryVariables = Types.Exact<{
  handbook: Array<Types.HandbookInput> | Types.HandbookInput;
}>;


export type StepTwoExpandExtremesQuery = { __typename?: 'Query', stepTwoExpandExtremes?: Array<Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }>> | null };


export const StepTwoExpandExtremesDocument = gql`
    query StepTwoExpandExtremes($handbook: [HandbookInput!]!) {
  stepTwoExpandExtremes(handbook: $handbook) {
    ...Handbook
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useStepTwoExpandExtremesQuery__
 *
 * To run a query within a React component, call `useStepTwoExpandExtremesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStepTwoExpandExtremesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStepTwoExpandExtremesQuery({
 *   variables: {
 *      handbook: // value for 'handbook'
 *   },
 * });
 */
export function useStepTwoExpandExtremesQuery(baseOptions: Apollo.QueryHookOptions<StepTwoExpandExtremesQuery, StepTwoExpandExtremesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StepTwoExpandExtremesQuery, StepTwoExpandExtremesQueryVariables>(StepTwoExpandExtremesDocument, options);
      }
export function useStepTwoExpandExtremesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StepTwoExpandExtremesQuery, StepTwoExpandExtremesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StepTwoExpandExtremesQuery, StepTwoExpandExtremesQueryVariables>(StepTwoExpandExtremesDocument, options);
        }
export type StepTwoExpandExtremesQueryHookResult = ReturnType<typeof useStepTwoExpandExtremesQuery>;
export type StepTwoExpandExtremesLazyQueryHookResult = ReturnType<typeof useStepTwoExpandExtremesLazyQuery>;
export type StepTwoExpandExtremesQueryResult = Apollo.QueryResult<StepTwoExpandExtremesQuery, StepTwoExpandExtremesQueryVariables>;