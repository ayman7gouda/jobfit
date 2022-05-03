import * as Types from '../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { SkillClusterFragmentDoc } from './SkillCluster.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddDescriptionMutationVariables = Types.Exact<{
  clusterId: Types.Scalars['Int'];
}>;


export type AddDescriptionMutation = { __typename?: 'Mutation', addDescription: { __typename?: 'SkillCluster', name: string, category: string, id: number, descriptions: Array<{ __typename?: 'SkillClusterDescription', id: number, source: string, name: string, description: string }> } };


export const AddDescriptionDocument = gql`
    mutation AddDescription($clusterId: Int!) {
  addDescription(clusterId: $clusterId) {
    ...SkillCluster
  }
}
    ${SkillClusterFragmentDoc}`;
export type AddDescriptionMutationFn = Apollo.MutationFunction<AddDescriptionMutation, AddDescriptionMutationVariables>;

/**
 * __useAddDescriptionMutation__
 *
 * To run a mutation, you first call `useAddDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDescriptionMutation, { data, loading, error }] = useAddDescriptionMutation({
 *   variables: {
 *      clusterId: // value for 'clusterId'
 *   },
 * });
 */
export function useAddDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<AddDescriptionMutation, AddDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDescriptionMutation, AddDescriptionMutationVariables>(AddDescriptionDocument, options);
      }
export type AddDescriptionMutationHookResult = ReturnType<typeof useAddDescriptionMutation>;
export type AddDescriptionMutationResult = Apollo.MutationResult<AddDescriptionMutation>;
export type AddDescriptionMutationOptions = Apollo.BaseMutationOptions<AddDescriptionMutation, AddDescriptionMutationVariables>;