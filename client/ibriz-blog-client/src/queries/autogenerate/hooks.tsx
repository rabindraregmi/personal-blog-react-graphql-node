import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}

export const GetOneBlogPostDocument = gql`
    query GetOneBlogPost($getOneBlogPostId: ID!) {
  getOneBlogPost(id: $getOneBlogPostId) {
    title
    subtitle
    content
    published
    created_at
    id
    category {
      name
    }
  }
}
    `;

/**
 * __useGetOneBlogPostQuery__
 *
 * To run a query within a React component, call `useGetOneBlogPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneBlogPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneBlogPostQuery({
 *   variables: {
 *      getOneBlogPostId: // value for 'getOneBlogPostId'
 *   },
 * });
 */
export function useGetOneBlogPostQuery(baseOptions: Apollo.QueryHookOptions<Types.GetOneBlogPostQuery, Types.GetOneBlogPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetOneBlogPostQuery, Types.GetOneBlogPostQueryVariables>(GetOneBlogPostDocument, options);
      }
export function useGetOneBlogPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetOneBlogPostQuery, Types.GetOneBlogPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetOneBlogPostQuery, Types.GetOneBlogPostQueryVariables>(GetOneBlogPostDocument, options);
        }
export type GetOneBlogPostQueryHookResult = ReturnType<typeof useGetOneBlogPostQuery>;
export type GetOneBlogPostLazyQueryHookResult = ReturnType<typeof useGetOneBlogPostLazyQuery>;
export type GetOneBlogPostQueryResult = Apollo.QueryResult<Types.GetOneBlogPostQuery, Types.GetOneBlogPostQueryVariables>;
export const CreateNewBlogPostDocument = gql`
    mutation CreateNewBlogPost($blog: BlogInput!) {
  createBlogPost(blog: $blog) {
    title
    subtitle
    content
    published
  }
}
    `;
export type CreateNewBlogPostMutationFn = Apollo.MutationFunction<Types.CreateNewBlogPostMutation, Types.CreateNewBlogPostMutationVariables>;

/**
 * __useCreateNewBlogPostMutation__
 *
 * To run a mutation, you first call `useCreateNewBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewBlogPostMutation, { data, loading, error }] = useCreateNewBlogPostMutation({
 *   variables: {
 *      blog: // value for 'blog'
 *   },
 * });
 */
export function useCreateNewBlogPostMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateNewBlogPostMutation, Types.CreateNewBlogPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateNewBlogPostMutation, Types.CreateNewBlogPostMutationVariables>(CreateNewBlogPostDocument, options);
      }
export type CreateNewBlogPostMutationHookResult = ReturnType<typeof useCreateNewBlogPostMutation>;
export type CreateNewBlogPostMutationResult = Apollo.MutationResult<Types.CreateNewBlogPostMutation>;
export type CreateNewBlogPostMutationOptions = Apollo.BaseMutationOptions<Types.CreateNewBlogPostMutation, Types.CreateNewBlogPostMutationVariables>;
export const EditBlogPostDocument = gql`
    mutation EditBlogPost($blog: BlogInput!) {
  editBlogPost(blog: $blog) {
    title
    subtitle
    content
    published
  }
}
    `;
export type EditBlogPostMutationFn = Apollo.MutationFunction<Types.EditBlogPostMutation, Types.EditBlogPostMutationVariables>;

/**
 * __useEditBlogPostMutation__
 *
 * To run a mutation, you first call `useEditBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBlogPostMutation, { data, loading, error }] = useEditBlogPostMutation({
 *   variables: {
 *      blog: // value for 'blog'
 *   },
 * });
 */
export function useEditBlogPostMutation(baseOptions?: Apollo.MutationHookOptions<Types.EditBlogPostMutation, Types.EditBlogPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EditBlogPostMutation, Types.EditBlogPostMutationVariables>(EditBlogPostDocument, options);
      }
export type EditBlogPostMutationHookResult = ReturnType<typeof useEditBlogPostMutation>;
export type EditBlogPostMutationResult = Apollo.MutationResult<Types.EditBlogPostMutation>;
export type EditBlogPostMutationOptions = Apollo.BaseMutationOptions<Types.EditBlogPostMutation, Types.EditBlogPostMutationVariables>;
export const DeleteBlogPostDocument = gql`
    mutation DeleteBlogPost($id: ID!) {
  deleteBlogPost(id: $id) {
    title
    subtitle
  }
}
    `;
export type DeleteBlogPostMutationFn = Apollo.MutationFunction<Types.DeleteBlogPostMutation, Types.DeleteBlogPostMutationVariables>;

/**
 * __useDeleteBlogPostMutation__
 *
 * To run a mutation, you first call `useDeleteBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogPostMutation, { data, loading, error }] = useDeleteBlogPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBlogPostMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteBlogPostMutation, Types.DeleteBlogPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteBlogPostMutation, Types.DeleteBlogPostMutationVariables>(DeleteBlogPostDocument, options);
      }
export type DeleteBlogPostMutationHookResult = ReturnType<typeof useDeleteBlogPostMutation>;
export type DeleteBlogPostMutationResult = Apollo.MutationResult<Types.DeleteBlogPostMutation>;
export type DeleteBlogPostMutationOptions = Apollo.BaseMutationOptions<Types.DeleteBlogPostMutation, Types.DeleteBlogPostMutationVariables>;
export const GetAllBlogsDocument = gql`
    query GetAllBlogs {
  getAllBlogPost {
    id
    title
    subtitle
    content
    published
    created_at
    updated_at
    category {
      name
    }
  }
}
    `;

/**
 * __useGetAllBlogsQuery__
 *
 * To run a query within a React component, call `useGetAllBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBlogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBlogsQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetAllBlogsQuery, Types.GetAllBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetAllBlogsQuery, Types.GetAllBlogsQueryVariables>(GetAllBlogsDocument, options);
      }
export function useGetAllBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetAllBlogsQuery, Types.GetAllBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetAllBlogsQuery, Types.GetAllBlogsQueryVariables>(GetAllBlogsDocument, options);
        }
export type GetAllBlogsQueryHookResult = ReturnType<typeof useGetAllBlogsQuery>;
export type GetAllBlogsLazyQueryHookResult = ReturnType<typeof useGetAllBlogsLazyQuery>;
export type GetAllBlogsQueryResult = Apollo.QueryResult<Types.GetAllBlogsQuery, Types.GetAllBlogsQueryVariables>;
export const GetAllPublishedBlogsDocument = gql`
    query GetAllPublishedBlogs {
  getPublishedBlogPost {
    id
    title
    subtitle
    content
    published
    created_at
    category {
      name
    }
  }
}
    `;

/**
 * __useGetAllPublishedBlogsQuery__
 *
 * To run a query within a React component, call `useGetAllPublishedBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPublishedBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPublishedBlogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPublishedBlogsQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetAllPublishedBlogsQuery, Types.GetAllPublishedBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetAllPublishedBlogsQuery, Types.GetAllPublishedBlogsQueryVariables>(GetAllPublishedBlogsDocument, options);
      }
export function useGetAllPublishedBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetAllPublishedBlogsQuery, Types.GetAllPublishedBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetAllPublishedBlogsQuery, Types.GetAllPublishedBlogsQueryVariables>(GetAllPublishedBlogsDocument, options);
        }
export type GetAllPublishedBlogsQueryHookResult = ReturnType<typeof useGetAllPublishedBlogsQuery>;
export type GetAllPublishedBlogsLazyQueryHookResult = ReturnType<typeof useGetAllPublishedBlogsLazyQuery>;
export type GetAllPublishedBlogsQueryResult = Apollo.QueryResult<Types.GetAllPublishedBlogsQuery, Types.GetAllPublishedBlogsQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    name
    id
    description
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>;
export const GetFilteredBlogPostDocument = gql`
    query GetFilteredBlogPost($search: String, $query: BlogInput) {
  getAllBlogPost(search: $search, query: $query) {
    title
    subtitle
    content
    published
    created_at
    id
  }
}
    `;

/**
 * __useGetFilteredBlogPostQuery__
 *
 * To run a query within a React component, call `useGetFilteredBlogPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredBlogPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredBlogPostQuery({
 *   variables: {
 *      search: // value for 'search'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetFilteredBlogPostQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetFilteredBlogPostQuery, Types.GetFilteredBlogPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetFilteredBlogPostQuery, Types.GetFilteredBlogPostQueryVariables>(GetFilteredBlogPostDocument, options);
      }
export function useGetFilteredBlogPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetFilteredBlogPostQuery, Types.GetFilteredBlogPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetFilteredBlogPostQuery, Types.GetFilteredBlogPostQueryVariables>(GetFilteredBlogPostDocument, options);
        }
export type GetFilteredBlogPostQueryHookResult = ReturnType<typeof useGetFilteredBlogPostQuery>;
export type GetFilteredBlogPostLazyQueryHookResult = ReturnType<typeof useGetFilteredBlogPostLazyQuery>;
export type GetFilteredBlogPostQueryResult = Apollo.QueryResult<Types.GetFilteredBlogPostQuery, Types.GetFilteredBlogPostQueryVariables>;
export const GetFilteredPublicBlogPostDocument = gql`
    query GetFilteredPublicBlogPost($search: String) {
  getPublishedBlogPost(search: $search) {
    title
    created_at
    id
  }
}
    `;

/**
 * __useGetFilteredPublicBlogPostQuery__
 *
 * To run a query within a React component, call `useGetFilteredPublicBlogPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredPublicBlogPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredPublicBlogPostQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetFilteredPublicBlogPostQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetFilteredPublicBlogPostQuery, Types.GetFilteredPublicBlogPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetFilteredPublicBlogPostQuery, Types.GetFilteredPublicBlogPostQueryVariables>(GetFilteredPublicBlogPostDocument, options);
      }
export function useGetFilteredPublicBlogPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetFilteredPublicBlogPostQuery, Types.GetFilteredPublicBlogPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetFilteredPublicBlogPostQuery, Types.GetFilteredPublicBlogPostQueryVariables>(GetFilteredPublicBlogPostDocument, options);
        }
export type GetFilteredPublicBlogPostQueryHookResult = ReturnType<typeof useGetFilteredPublicBlogPostQuery>;
export type GetFilteredPublicBlogPostLazyQueryHookResult = ReturnType<typeof useGetFilteredPublicBlogPostLazyQuery>;
export type GetFilteredPublicBlogPostQueryResult = Apollo.QueryResult<Types.GetFilteredPublicBlogPostQuery, Types.GetFilteredPublicBlogPostQueryVariables>;
export const LoginDocument = gql`
    query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userId
    token
    tokenExpiration
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<Types.LoginQuery, Types.LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LoginQuery, Types.LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LoginQuery, Types.LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LoginQuery, Types.LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<Types.LoginQuery, Types.LoginQueryVariables>;
export const AuthorizeTokenDocument = gql`
    query AuthorizeToken($token: String!) {
  authorize(token: $token)
}
    `;

/**
 * __useAuthorizeTokenQuery__
 *
 * To run a query within a React component, call `useAuthorizeTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorizeTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAuthorizeTokenQuery(baseOptions: Apollo.QueryHookOptions<Types.AuthorizeTokenQuery, Types.AuthorizeTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AuthorizeTokenQuery, Types.AuthorizeTokenQueryVariables>(AuthorizeTokenDocument, options);
      }
export function useAuthorizeTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AuthorizeTokenQuery, Types.AuthorizeTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AuthorizeTokenQuery, Types.AuthorizeTokenQueryVariables>(AuthorizeTokenDocument, options);
        }
export type AuthorizeTokenQueryHookResult = ReturnType<typeof useAuthorizeTokenQuery>;
export type AuthorizeTokenLazyQueryHookResult = ReturnType<typeof useAuthorizeTokenLazyQuery>;
export type AuthorizeTokenQueryResult = Apollo.QueryResult<Types.AuthorizeTokenQuery, Types.AuthorizeTokenQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile {
  getUserProfile {
    email
    profile {
      full_name
      mobile_number
      address
      intro
      social {
        github
        instagram
        twitter
        linkedin
      }
    }
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetUserProfileQuery, Types.GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetUserProfileQuery, Types.GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserProfileQuery, Types.GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetUserProfileQuery, Types.GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<Types.GetUserProfileQuery, Types.GetUserProfileQueryVariables>;
export const EditUserProfileDocument = gql`
    mutation EditUserProfile($user: UserInput!) {
  editUser(user: $user) {
    email
    profile {
      full_name
      mobile_number
      address
      intro
      social {
        github
      }
    }
  }
}
    `;
export type EditUserProfileMutationFn = Apollo.MutationFunction<Types.EditUserProfileMutation, Types.EditUserProfileMutationVariables>;

/**
 * __useEditUserProfileMutation__
 *
 * To run a mutation, you first call `useEditUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserProfileMutation, { data, loading, error }] = useEditUserProfileMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useEditUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<Types.EditUserProfileMutation, Types.EditUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EditUserProfileMutation, Types.EditUserProfileMutationVariables>(EditUserProfileDocument, options);
      }
export type EditUserProfileMutationHookResult = ReturnType<typeof useEditUserProfileMutation>;
export type EditUserProfileMutationResult = Apollo.MutationResult<Types.EditUserProfileMutation>;
export type EditUserProfileMutationOptions = Apollo.BaseMutationOptions<Types.EditUserProfileMutation, Types.EditUserProfileMutationVariables>;