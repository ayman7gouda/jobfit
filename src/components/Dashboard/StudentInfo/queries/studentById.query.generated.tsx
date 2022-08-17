import * as Types from '../../../../generated/clientTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StudentByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type StudentByIdQuery = { __typename?: 'Query', studentById: { __typename?: 'Student', id?: number | null, name?: string | null } };


export const StudentByIdDocument = gql`
    query StudentById($id: Int!) {
  studentById(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useStudentByIdQuery__
 *
 * To run a query within a React component, call `useStudentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudentByIdQuery(baseOptions: Apollo.QueryHookOptions<StudentByIdQuery, StudentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentByIdQuery, StudentByIdQueryVariables>(StudentByIdDocument, options);
      }
export function useStudentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentByIdQuery, StudentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentByIdQuery, StudentByIdQueryVariables>(StudentByIdDocument, options);
        }
export type StudentByIdQueryHookResult = ReturnType<typeof useStudentByIdQuery>;
export type StudentByIdLazyQueryHookResult = ReturnType<typeof useStudentByIdLazyQuery>;
export type StudentByIdQueryResult = Apollo.QueryResult<StudentByIdQuery, StudentByIdQueryVariables>;