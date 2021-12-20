import * as Types from './schemas';

export type GetOneBlogPostQueryVariables = Types.Exact<{
  getOneBlogPostId: Types.Scalars['ID'];
}>;


export type GetOneBlogPostQuery = { __typename?: 'Query', getOneBlogPost?: { __typename?: 'Blog', title: string, subtitle?: string | null | undefined, content?: string | null | undefined, published?: boolean | null | undefined, created_at: any, id: string, category?: { __typename?: 'Category', name: string } | null | undefined } | null | undefined };

export type CreateNewBlogPostMutationVariables = Types.Exact<{
  blog: Types.BlogInput;
}>;


export type CreateNewBlogPostMutation = { __typename?: 'Mutation', createBlogPost?: { __typename?: 'Blog', title: string, subtitle?: string | null | undefined, content?: string | null | undefined, published?: boolean | null | undefined } | null | undefined };

export type EditBlogPostMutationVariables = Types.Exact<{
  blog: Types.BlogInput;
}>;


export type EditBlogPostMutation = { __typename?: 'Mutation', editBlogPost?: { __typename?: 'Blog', title: string, subtitle?: string | null | undefined, content?: string | null | undefined, published?: boolean | null | undefined } | null | undefined };

export type DeleteBlogPostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteBlogPostMutation = { __typename?: 'Mutation', deleteBlogPost?: { __typename?: 'Blog', title: string, subtitle?: string | null | undefined } | null | undefined };

export type GetAllBlogsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllBlogsQuery = { __typename?: 'Query', getAllBlogPost?: Array<{ __typename?: 'Blog', id: string, title: string, subtitle?: string | null | undefined, content?: string | null | undefined, published?: boolean | null | undefined, created_at: any, updated_at: any, category?: { __typename?: 'Category', name: string } | null | undefined } | null | undefined> | null | undefined };

export type GetAllPublishedBlogsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllPublishedBlogsQuery = { __typename?: 'Query', getPublishedBlogPost?: Array<{ __typename?: 'Blog', id: string, title: string, subtitle?: string | null | undefined, content?: string | null | undefined, published?: boolean | null | undefined, created_at: any, category?: { __typename?: 'Category', name: string } | null | undefined } | null | undefined> | null | undefined };

export type GetCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', name: string, id: string, description?: string | null | undefined } | null | undefined> | null | undefined };

export type GetFilteredBlogPostQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']>;
  query?: Types.InputMaybe<Types.BlogInput>;
}>;


export type GetFilteredBlogPostQuery = { __typename?: 'Query', getAllBlogPost?: Array<{ __typename?: 'Blog', title: string, subtitle?: string | null | undefined, content?: string | null | undefined, published?: boolean | null | undefined, created_at: any, id: string } | null | undefined> | null | undefined };

export type GetFilteredPublicBlogPostQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetFilteredPublicBlogPostQuery = { __typename?: 'Query', getPublishedBlogPost?: Array<{ __typename?: 'Blog', title: string, created_at: any, id: string } | null | undefined> | null | undefined };

export type LoginQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'AuthData', userId: string, token: string, tokenExpiration: number } };

export type AuthorizeTokenQueryVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type AuthorizeTokenQuery = { __typename?: 'Query', authorize?: boolean | null | undefined };

export type GetUserProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile?: Array<{ __typename?: 'User', email: string, profile?: { __typename?: 'Profile', full_name: string, mobile_number?: string | null | undefined, address?: string | null | undefined, intro?: string | null | undefined, social?: { __typename?: 'SocialProfile', github?: string | null | undefined, instagram?: string | null | undefined, twitter?: string | null | undefined, linkedin?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type EditUserProfileMutationVariables = Types.Exact<{
  user: Types.UserInput;
}>;


export type EditUserProfileMutation = { __typename?: 'Mutation', editUser?: { __typename?: 'User', email: string, profile?: { __typename?: 'Profile', full_name: string, mobile_number?: string | null | undefined, address?: string | null | undefined, intro?: string | null | undefined, social?: { __typename?: 'SocialProfile', github?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };
