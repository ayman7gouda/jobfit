import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResolveConstraintsQueryVariables = Types.Exact<{
  programId: Types.Scalars['Int'];
  handbook: Array<Types.HandbookInput> | Types.HandbookInput;
}>;


export type ResolveConstraintsQuery = { __typename?: 'Query', resolveConstraints: Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }> };


export const ResolveConstraintsDocument = gql`
    query ResolveConstraints($programId: Int!, $handbook: [HandbookInput!]!) {
  resolveConstraints(programId: $programId, handbook: $handbook) {
    ...Handbook
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useResolveConstraintsQuery__
 *
 * To run a query within a React component, call `useResolveConstraintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useResolveConstraintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResolveConstraintsQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *      handbook: // value for 'handbook'
 *   },
 * });
 */
export function useResolveConstraintsQuery(baseOptions: Apollo.QueryHookOptions<ResolveConstraintsQuery, ResolveConstraintsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResolveConstraintsQuery, ResolveConstraintsQueryVariables>(ResolveConstraintsDocument, options);
      }
export function useResolveConstraintsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResolveConstraintsQuery, ResolveConstraintsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResolveConstraintsQuery, ResolveConstraintsQueryVariables>(ResolveConstraintsDocument, options);
        }
export type ResolveConstraintsQueryHookResult = ReturnType<typeof useResolveConstraintsQuery>;
export type ResolveConstraintsLazyQueryHookResult = ReturnType<typeof useResolveConstraintsLazyQuery>;
export type ResolveConstraintsQueryResult = Apollo.QueryResult<ResolveConstraintsQuery, ResolveConstraintsQueryVariables>;