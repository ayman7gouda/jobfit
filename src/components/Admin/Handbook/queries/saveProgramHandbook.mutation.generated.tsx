import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { HandbookFragmentDoc } from './handbook.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveProgramHandbookMutationVariables = Types.Exact<{
  input: Types.ProgramInput;
}>;


export type SaveProgramHandbookMutation = { __typename?: 'Mutation', saveProgramHandbook?: { __typename?: 'Program', id: number, updated?: string | null, handbook?: Array<{ __typename?: 'Handbook', credits?: number | null, flagged?: boolean | null, folder?: boolean | null, id: number, index?: number | null, level?: number | null, maxNumber?: number | null, nodeId: number, number?: number | null, parentId?: number | null, reference?: number | null, selection?: Types.Selection | null, selector?: string | null, subjectCode?: string | null, subjectName?: string | null, text?: string | null, type: Types.NodeType }> | null } | null };


export const SaveProgramHandbookDocument = gql`
    mutation SaveProgramHandbook($input: ProgramInput!) {
  saveProgramHandbook(input: $input) {
    id
    updated
    handbook {
      ...Handbook
    }
  }
}
    ${HandbookFragmentDoc}`;
export type SaveProgramHandbookMutationFn = Apollo.MutationFunction<SaveProgramHandbookMutation, SaveProgramHandbookMutationVariables>;

/**
 * __useSaveProgramHandbookMutation__
 *
 * To run a mutation, you first call `useSaveProgramHandbookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProgramHandbookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProgramHandbookMutation, { data, loading, error }] = useSaveProgramHandbookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveProgramHandbookMutation(baseOptions?: Apollo.MutationHookOptions<SaveProgramHandbookMutation, SaveProgramHandbookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveProgramHandbookMutation, SaveProgramHandbookMutationVariables>(SaveProgramHandbookDocument, options);
      }
export type SaveProgramHandbookMutationHookResult = ReturnType<typeof useSaveProgramHandbookMutation>;
export type SaveProgramHandbookMutationResult = Apollo.MutationResult<SaveProgramHandbookMutation>;
export type SaveProgramHandbookMutationOptions = Apollo.BaseMutationOptions<SaveProgramHandbookMutation, SaveProgramHandbookMutationVariables>;