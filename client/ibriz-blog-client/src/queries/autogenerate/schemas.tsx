export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthData = {
  __typename?: 'AuthData';
  token: Scalars['String'];
  tokenExpiration: Scalars['Int'];
  userId: Scalars['ID'];
};

export type Blog = {
  __typename?: 'Blog';
  category?: Maybe<Category>;
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['Date'];
  id: Scalars['ID'];
  published?: Maybe<Scalars['Boolean']>;
  subtitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['Date'];
};

export type BlogInput = {
  category?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  published?: InputMaybe<Scalars['Boolean']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlogPost?: Maybe<Blog>;
  createCategory?: Maybe<Category>;
  createUser?: Maybe<User>;
  deleteBlogPost?: Maybe<Blog>;
  deleteCategory?: Maybe<Category>;
  deleteUser?: Maybe<User>;
  editBlogPost?: Maybe<Blog>;
  editCategory?: Maybe<Category>;
  editUser?: Maybe<User>;
};


export type MutationCreateBlogPostArgs = {
  blog: BlogInput;
};


export type MutationCreateCategoryArgs = {
  category: CategoryInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteBlogPostArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationEditBlogPostArgs = {
  blog: BlogInput;
};


export type MutationEditCategoryArgs = {
  category: CategoryInput;
};


export type MutationEditUserArgs = {
  user: UserInput;
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']>;
  full_name: Scalars['String'];
  intro?: Maybe<Scalars['String']>;
  mobile_number?: Maybe<Scalars['String']>;
  social?: Maybe<SocialProfile>;
};

export type ProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  full_name?: InputMaybe<Scalars['String']>;
  intro?: InputMaybe<Scalars['String']>;
  mobile_number?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  social?: InputMaybe<SocialProfileInput>;
};

export type Query = {
  __typename?: 'Query';
  User?: Maybe<User>;
  Users?: Maybe<Array<Maybe<User>>>;
  authorize?: Maybe<Scalars['Boolean']>;
  getAllBlogPost?: Maybe<Array<Maybe<Blog>>>;
  getCategories?: Maybe<Array<Maybe<Category>>>;
  getOneBlogPost?: Maybe<Blog>;
  getPublishedBlogPost?: Maybe<Array<Maybe<Blog>>>;
  getUserProfile?: Maybe<Array<Maybe<User>>>;
  login: AuthData;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryAuthorizeArgs = {
  token: Scalars['String'];
};


export type QueryGetAllBlogPostArgs = {
  query?: InputMaybe<BlogInput>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetOneBlogPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetPublishedBlogPostArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SocialProfile = {
  __typename?: 'SocialProfile';
  github?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type SocialProfileInput = {
  github?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  linkedin?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  profile?: Maybe<Profile>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ProfileInput>;
};
