import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import { SkillClusterFragmentDoc } from './SkillCluster.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveDescriptionMutationVariables = Types.Exact<{
  clusterId: Types.Scalars['Int'];
  descriptionId: Types.Scalars['Int'];
}>;


export type RemoveDescriptionMutation = { __typename?: 'Mutation', deleteDescription: { __typename?: 'SkillCluster', name: string, category: string, id: number, descriptions: Array<{ __typename?: 'SkillClusterDescription', id: number, source: string, name: string, description: string }> } };


export const RemoveDescriptionDocument = gql`
    mutation RemoveDescription($clusterId: Int!, $descriptionId: Int!) {
  deleteDescription(clusterId: $clusterId, descriptionId: $descriptionId) {
    ...SkillCluster
  }
}
    ${SkillClusterFragmentDoc}`;
export type RemoveDescriptionMutationFn = Apollo.MutationFunction<RemoveDescriptionMutation, RemoveDescriptionMutationVariables>;

/**
 * __useRemoveDescriptionMutation__
 *
 * To run a mutation, you first call `useRemoveDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDescriptionMutation, { data, loading, error }] = useRemoveDescriptionMutation({
 *   variables: {
 *      clusterId: // value for 'clusterId'
 *      descriptionId: // value for 'descriptionId'
 *   },
 * });
 */
export function useRemoveDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDescriptionMutation, RemoveDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveDescriptionMutation, RemoveDescriptionMutationVariables>(RemoveDescriptionDocument, options);
      }
export type RemoveDescriptionMutationHookResult = ReturnType<typeof useRemoveDescriptionMutation>;
export type RemoveDescriptionMutationResult = Apollo.MutationResult<RemoveDescriptionMutation>;
export type RemoveDescriptionMutationOptions = Apollo.BaseMutationOptions<RemoveDescriptionMutation, RemoveDescriptionMutationVariables>;