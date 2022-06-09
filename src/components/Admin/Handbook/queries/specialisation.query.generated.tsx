import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SpecialisationQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type SpecialisationQuery = { __typename?: 'Query', specialisation?: { __typename?: 'Specialisation', id: number, name: string, code: string, url: string, legacyCode?: string | null, description?: string | null, availability?: string | null, structureSource?: string | null, sequenceSource?: string | null, updated?: string | null, handbook?: Array<{ __typename?: 'Handbook', id: number, nodeId: number, parentId?: number | null, text?: string | null, folder?: boolean | null, type?: string | null, selection?: Types.Selection | null, number?: number | null, credits?: number | null, level?: number | null, reference?: number | null, collection?: number | null, flagged?: boolean | null, selector?: string | null, index?: number | null, subjectCode?: string | null, subjectName?: string | null, maxNumber?: number | null }> | null } | null };


export const SpecialisationDocument = gql`
    query Specialisation($id: Int!) {
  specialisation(id: $id) {
    id
    name
    code
    url
    legacyCode
    description
    availability
    structureSource
    sequenceSource
    handbook {
      ...Handbook
    }
    updated
  }
}
    ${HandbookFragmentDoc}`;

/**
 * __useSpecialisationQuery__
 *
 * To run a query within a React component, call `useSpecialisationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialisationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialisationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpecialisationQuery(baseOptions: Apollo.QueryHookOptions<SpecialisationQuery, SpecialisationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpecialisationQuery, SpecialisationQueryVariables>(SpecialisationDocument, options);
      }
export function useSpecialisationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpecialisationQuery, SpecialisationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpecialisationQuery, SpecialisationQueryVariables>(SpecialisationDocument, options);
        }
export type SpecialisationQueryHookResult = ReturnType<typeof useSpecialisationQuery>;
export type SpecialisationLazyQueryHookResult = ReturnType<typeof useSpecialisationLazyQuery>;
export type SpecialisationQueryResult = Apollo.QueryResult<SpecialisationQuery, SpecialisationQueryVariables>;