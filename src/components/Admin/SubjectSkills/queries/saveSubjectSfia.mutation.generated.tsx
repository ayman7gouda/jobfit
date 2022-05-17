import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveSubjectSfiaMutationVariables = Types.Exact<{
  subjectId: Types.Scalars['Int'];
  sfiaId: Types.Scalars['Int'];
  level: Types.Scalars['Int'];
}>;


export type SaveSubjectSfiaMutation = { __typename?: 'Mutation', saveSubjectSfia?: { __typename?: 'SubjectSfiaSkill', id: number, subjectId: number, sfiaId: number, level: number } | null };


export const SaveSubjectSfiaDocument = gql`
    mutation SaveSubjectSfia($subjectId: Int!, $sfiaId: Int!, $level: Int!) {
  saveSubjectSfia(subjectId: $subjectId, sfiaId: $sfiaId, level: $level) {
    id
    subjectId
    sfiaId
    level
  }
}
    `;
export type SaveSubjectSfiaMutationFn = Apollo.MutationFunction<SaveSubjectSfiaMutation, SaveSubjectSfiaMutationVariables>;

/**
 * __useSaveSubjectSfiaMutation__
 *
 * To run a mutation, you first call `useSaveSubjectSfiaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSubjectSfiaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSubjectSfiaMutation, { data, loading, error }] = useSaveSubjectSfiaMutation({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *      sfiaId: // value for 'sfiaId'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useSaveSubjectSfiaMutation(baseOptions?: Apollo.MutationHookOptions<SaveSubjectSfiaMutation, SaveSubjectSfiaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveSubjectSfiaMutation, SaveSubjectSfiaMutationVariables>(SaveSubjectSfiaDocument, options);
      }
export type SaveSubjectSfiaMutationHookResult = ReturnType<typeof useSaveSubjectSfiaMutation>;
export type SaveSubjectSfiaMutationResult = Apollo.MutationResult<SaveSubjectSfiaMutation>;
export type SaveSubjectSfiaMutationOptions = Apollo.BaseMutationOptions<SaveSubjectSfiaMutation, SaveSubjectSfiaMutationVariables>;