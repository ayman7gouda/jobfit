import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveSpecialisationHandbookMutationVariables = Types.Exact<{
  input: Types.SpecialisationInput;
}>;


export type SaveSpecialisationHandbookMutation = { __typename?: 'Mutation', saveSpecialisationHandbook?: { __typename?: 'Specialisation', id: number, updated?: string | null, handbook?: Array<{ __typename?: 'Handbook', id: number, nodeId: number, parentId?: number | null, text?: string | null, folder?: boolean | null, type?: string | null, selection?: Types.Selection | null, number?: number | null, credits?: number | null, level?: number | null, reference?: number | null, collection?: number | null, flagged?: boolean | null, selector?: string | null, index?: number | null }> | null } | null };


export const SaveSpecialisationHandbookDocument = gql`
    mutation SaveSpecialisationHandbook($input: SpecialisationInput!) {
  saveSpecialisationHandbook(input: $input) {
    id
    updated
    handbook {
      ...Handbook
    }
  }
}
    ${HandbookFragmentDoc}`;
export type SaveSpecialisationHandbookMutationFn = Apollo.MutationFunction<SaveSpecialisationHandbookMutation, SaveSpecialisationHandbookMutationVariables>;

/**
 * __useSaveSpecialisationHandbookMutation__
 *
 * To run a mutation, you first call `useSaveSpecialisationHandbookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSpecialisationHandbookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSpecialisationHandbookMutation, { data, loading, error }] = useSaveSpecialisationHandbookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveSpecialisationHandbookMutation(baseOptions?: Apollo.MutationHookOptions<SaveSpecialisationHandbookMutation, SaveSpecialisationHandbookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveSpecialisationHandbookMutation, SaveSpecialisationHandbookMutationVariables>(SaveSpecialisationHandbookDocument, options);
      }
export type SaveSpecialisationHandbookMutationHookResult = ReturnType<typeof useSaveSpecialisationHandbookMutation>;
export type SaveSpecialisationHandbookMutationResult = Apollo.MutationResult<SaveSpecialisationHandbookMutation>;
export type SaveSpecialisationHandbookMutationOptions = Apollo.BaseMutationOptions<SaveSpecialisationHandbookMutation, SaveSpecialisationHandbookMutationVariables>;