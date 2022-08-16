import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllCombinationsQueryVariables = Types.Exact<{
  programId: Types.Scalars['Int'];
  handbook: Array<Types.HandbookInput> | Types.HandbookInput;
}>;


export type AllCombinationsQuery = { __typename?: 'Query', allCombinations?: { __typename?: 'CombinationsResult', combinations: Array<Array<number>>, handbook: Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }> } | null };


export const AllCombinationsDocument = gql`
    query AllCombinations($programId: Int!, $handbook: [HandbookInput!]!) {
  allCombinations(programId: $programId, handbook: $handbook) {
    handbook {
      ...Handbook
    }
    combinations
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useAllCombinationsQuery__
 *
 * To run a query within a React component, call `useAllCombinationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCombinationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCombinationsQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *      handbook: // value for 'handbook'
 *   },
 * });
 */
export function useAllCombinationsQuery(baseOptions: Apollo.QueryHookOptions<AllCombinationsQuery, AllCombinationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCombinationsQuery, AllCombinationsQueryVariables>(AllCombinationsDocument, options);
      }
export function useAllCombinationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCombinationsQuery, AllCombinationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCombinationsQuery, AllCombinationsQueryVariables>(AllCombinationsDocument, options);
        }
export type AllCombinationsQueryHookResult = ReturnType<typeof useAllCombinationsQuery>;
export type AllCombinationsLazyQueryHookResult = ReturnType<typeof useAllCombinationsLazyQuery>;
export type AllCombinationsQueryResult = Apollo.QueryResult<AllCombinationsQuery, AllCombinationsQueryVariables>;