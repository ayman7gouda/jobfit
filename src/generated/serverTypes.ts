import { GraphQLResolveInfo } from 'graphql';
import { Context } from 'pages/api/graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Job = {
  __typename?: 'Job';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDescription: SkillCluster;
  deleteDescription: SkillCluster;
  status?: Maybe<Scalars['String']>;
  updateDescription: SkillClusterDescription;
};


export type MutationAddDescriptionArgs = {
  clusterId: Scalars['Int'];
};


export type MutationDeleteDescriptionArgs = {
  clusterId: Scalars['Int'];
  descriptionId: Scalars['Int'];
};


export type MutationUpdateDescriptionArgs = {
  description: SkillClusterDescriptionInput;
};

export type Query = {
  __typename?: 'Query';
  jobs: Array<Job>;
  skillCluster?: Maybe<SkillCluster>;
  skillClusters: Array<SkillCluster>;
  skills: Array<Skill>;
  status?: Maybe<Scalars['String']>;
};


export type QuerySkillClusterArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Skill = {
  __typename?: 'Skill';
  clusterName: Scalars['String'];
  clusters?: Maybe<Array<SkillClusters>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type SkillCluster = {
  __typename?: 'SkillCluster';
  category: Scalars['String'];
  descriptions: Array<SkillClusterDescription>;
  id: Scalars['Int'];
  name: Scalars['String'];
  skills?: Maybe<Array<SkillClusters>>;
};

export type SkillClusterDescription = {
  __typename?: 'SkillClusterDescription';
  clusterId: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  skillCluster?: Maybe<SkillCluster>;
  source: Scalars['String'];
};

export type SkillClusterDescriptionInput = {
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  source: Scalars['String'];
};

export type SkillClusters = {
  __typename?: 'SkillClusters';
  cluster?: Maybe<SkillCluster>;
  clusterId: Scalars['Int'];
  skill?: Maybe<Skill>;
  skillId: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Job: ResolverTypeWrapper<Job>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Skill: ResolverTypeWrapper<Skill>;
  SkillCluster: ResolverTypeWrapper<SkillCluster>;
  SkillClusterDescription: ResolverTypeWrapper<SkillClusterDescription>;
  SkillClusterDescriptionInput: SkillClusterDescriptionInput;
  SkillClusters: ResolverTypeWrapper<SkillClusters>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Job: Job;
  Mutation: {};
  Query: {};
  Skill: Skill;
  SkillCluster: SkillCluster;
  SkillClusterDescription: SkillClusterDescription;
  SkillClusterDescriptionInput: SkillClusterDescriptionInput;
  SkillClusters: SkillClusters;
  String: Scalars['String'];
};

export type JobResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addDescription?: Resolver<ResolversTypes['SkillCluster'], ParentType, ContextType, RequireFields<MutationAddDescriptionArgs, 'clusterId'>>;
  deleteDescription?: Resolver<ResolversTypes['SkillCluster'], ParentType, ContextType, RequireFields<MutationDeleteDescriptionArgs, 'clusterId' | 'descriptionId'>>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateDescription?: Resolver<ResolversTypes['SkillClusterDescription'], ParentType, ContextType, RequireFields<MutationUpdateDescriptionArgs, 'description'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  jobs?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType>;
  skillCluster?: Resolver<Maybe<ResolversTypes['SkillCluster']>, ParentType, ContextType, Partial<QuerySkillClusterArgs>>;
  skillClusters?: Resolver<Array<ResolversTypes['SkillCluster']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SkillResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  clusterName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clusters?: Resolver<Maybe<Array<ResolversTypes['SkillClusters']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillClusterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SkillCluster'] = ResolversParentTypes['SkillCluster']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  descriptions?: Resolver<Array<ResolversTypes['SkillClusterDescription']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<ResolversTypes['SkillClusters']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillClusterDescriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SkillClusterDescription'] = ResolversParentTypes['SkillClusterDescription']> = {
  clusterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skillCluster?: Resolver<Maybe<ResolversTypes['SkillCluster']>, ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillClustersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SkillClusters'] = ResolversParentTypes['SkillClusters']> = {
  cluster?: Resolver<Maybe<ResolversTypes['SkillCluster']>, ParentType, ContextType>;
  clusterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType>;
  skillId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Job?: JobResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  SkillCluster?: SkillClusterResolvers<ContextType>;
  SkillClusterDescription?: SkillClusterDescriptionResolvers<ContextType>;
  SkillClusters?: SkillClustersResolvers<ContextType>;
};

