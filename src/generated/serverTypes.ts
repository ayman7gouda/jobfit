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
  ANZSCO?: Maybe<Scalars['String']>;
  ANZSCOCode?: Maybe<Scalars['Int']>;
  ANZSICCode?: Maybe<Scalars['String']>;
  BGTOcc?: Maybe<Scalars['String']>;
  BGTOccName?: Maybe<Scalars['String']>;
  SA4Code?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateText?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  domainId?: Maybe<Scalars['String']>;
  duplicateId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  employer?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  intermediary?: Maybe<Scalars['String']>;
  jobId?: Maybe<Scalars['Int']>;
  jobReferenceId?: Maybe<Scalars['String']>;
  jobType?: Maybe<Scalars['String']>;
  maxAnnualSalary?: Maybe<Scalars['Float']>;
  maxExperience?: Maybe<Scalars['Float']>;
  maxHourlySalary?: Maybe<Scalars['Float']>;
  maximumDegree?: Maybe<Scalars['String']>;
  minAnnualSalary?: Maybe<Scalars['Float']>;
  minExperience?: Maybe<Scalars['Float']>;
  minHourlySalary?: Maybe<Scalars['Float']>;
  minimumDegree?: Maybe<Scalars['String']>;
  otherDegrees?: Maybe<Scalars['String']>;
  preferredDegrees?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  requiredDegrees?: Maybe<Scalars['String']>;
  skills: Array<JobSkills>;
  source?: Maybe<Scalars['String']>;
  standardMajor?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type JobCategory = {
  __typename?: 'JobCategory';
  avg: Scalars['Float'];
  count: Scalars['Int'];
  id: Scalars['Int'];
  max: Scalars['Float'];
  min: Scalars['Float'];
  name: Scalars['String'];
};

export type JobSkills = {
  __typename?: 'JobSkills';
  job?: Maybe<Job>;
  jobId?: Maybe<Scalars['Int']>;
  skill?: Maybe<Skill>;
  skillId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDescription: SkillCluster;
  deleteDescription: SkillCluster;
  saveSubjectSfia?: Maybe<SubjectSfiaSkill>;
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


export type MutationSaveSubjectSfiaArgs = {
  level: Scalars['Int'];
  sfiaId: Scalars['Int'];
  subjectId: Scalars['Int'];
};


export type MutationUpdateDescriptionArgs = {
  description: SkillClusterDescriptionInput;
};

export type Query = {
  __typename?: 'Query';
  findSubjectSkills?: Maybe<Subject>;
  findSubjects: Array<Subject>;
  jobCategories: Array<JobCategory>;
  jobs?: Maybe<Array<Job>>;
  sfia?: Maybe<SfiaSkill>;
  sfias: Array<SfiaSkill>;
  skillCluster?: Maybe<SkillCluster>;
  skillClusters: Array<SkillCluster>;
  skills: Array<Skill>;
  status?: Maybe<Scalars['String']>;
};


export type QueryFindSubjectSkillsArgs = {
  id: Scalars['Int'];
};


export type QueryFindSubjectsArgs = {
  query: Scalars['String'];
};


export type QueryJobsArgs = {
  id: Scalars['Int'];
};


export type QuerySfiaArgs = {
  id: Scalars['Int'];
};


export type QuerySkillClusterArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type SfiaEstimate = {
  __typename?: 'SfiaEstimate';
  id: Scalars['Int'];
  l1?: Maybe<Scalars['Float']>;
  l2?: Maybe<Scalars['Float']>;
  l3?: Maybe<Scalars['Float']>;
  l4?: Maybe<Scalars['Float']>;
  l5?: Maybe<Scalars['Float']>;
  l6?: Maybe<Scalars['Float']>;
  l7?: Maybe<Scalars['Float']>;
  overall: Scalars['Float'];
  rank?: Maybe<Scalars['Float']>;
  sfia?: Maybe<SfiaSkill>;
  sfiaId: Scalars['Int'];
  subject?: Maybe<Subject>;
  subjectId: Scalars['Int'];
};

export type SfiaLevel = {
  __typename?: 'SfiaLevel';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  skill?: Maybe<SfiaSkill>;
  skillId?: Maybe<Scalars['Int']>;
};

export type SfiaSkill = {
  __typename?: 'SfiaSkill';
  code: Scalars['String'];
  description: Scalars['String'];
  guidance: Scalars['String'];
  id: Scalars['Int'];
  levels?: Maybe<Array<SfiaLevel>>;
  name: Scalars['String'];
  subjectEstimates?: Maybe<Array<SfiaEstimate>>;
  subjects?: Maybe<Array<SubjectSfiaSkill>>;
  version: Scalars['Int'];
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
  cluster?: Maybe<SkillCluster>;
  clusterId: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
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

export type Subject = {
  __typename?: 'Subject';
  code: Scalars['String'];
  handbook: Scalars['String'];
  id: Scalars['Int'];
  los: Scalars['String'];
  losIntro: Scalars['String'];
  name: Scalars['String'];
  readingList: Scalars['String'];
  sfia?: Maybe<Array<SubjectSfiaSkill>>;
  sfiaEstimates?: Maybe<Array<SfiaEstimate>>;
  skills?: Maybe<Array<SubjectBgCluster>>;
};

export type SubjectBgCluster = {
  __typename?: 'SubjectBgCluster';
  cluster: SkillCluster;
  clusterId: Scalars['Int'];
  id: Scalars['Int'];
  skills?: Maybe<Array<SubjectBgSkill>>;
  subject: Subject;
  subjectId: Scalars['Int'];
};

export type SubjectBgSkill = {
  __typename?: 'SubjectBgSkill';
  cluster?: Maybe<SubjectBgCluster>;
  clusterId: Scalars['Int'];
  skill?: Maybe<Skill>;
  skillId: Scalars['Int'];
};

export type SubjectSfiaSkill = {
  __typename?: 'SubjectSfiaSkill';
  id: Scalars['Int'];
  level: Scalars['Int'];
  sfia?: Maybe<SfiaSkill>;
  sfiaId: Scalars['Int'];
  subject?: Maybe<Subject>;
  subjectId: Scalars['Int'];
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
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Job: ResolverTypeWrapper<Job>;
  JobCategory: ResolverTypeWrapper<JobCategory>;
  JobSkills: ResolverTypeWrapper<JobSkills>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SfiaEstimate: ResolverTypeWrapper<SfiaEstimate>;
  SfiaLevel: ResolverTypeWrapper<SfiaLevel>;
  SfiaSkill: ResolverTypeWrapper<SfiaSkill>;
  Skill: ResolverTypeWrapper<Skill>;
  SkillCluster: ResolverTypeWrapper<SkillCluster>;
  SkillClusterDescription: ResolverTypeWrapper<SkillClusterDescription>;
  SkillClusterDescriptionInput: SkillClusterDescriptionInput;
  SkillClusters: ResolverTypeWrapper<SkillClusters>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subject: ResolverTypeWrapper<Subject>;
  SubjectBgCluster: ResolverTypeWrapper<SubjectBgCluster>;
  SubjectBgSkill: ResolverTypeWrapper<SubjectBgSkill>;
  SubjectSfiaSkill: ResolverTypeWrapper<SubjectSfiaSkill>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Job: Job;
  JobCategory: JobCategory;
  JobSkills: JobSkills;
  Mutation: {};
  Query: {};
  SfiaEstimate: SfiaEstimate;
  SfiaLevel: SfiaLevel;
  SfiaSkill: SfiaSkill;
  Skill: Skill;
  SkillCluster: SkillCluster;
  SkillClusterDescription: SkillClusterDescription;
  SkillClusterDescriptionInput: SkillClusterDescriptionInput;
  SkillClusters: SkillClusters;
  String: Scalars['String'];
  Subject: Subject;
  SubjectBgCluster: SubjectBgCluster;
  SubjectBgSkill: SubjectBgSkill;
  SubjectSfiaSkill: SubjectSfiaSkill;
};

export type JobResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  ANZSCO?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ANZSCOCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ANZSICCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  BGTOcc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  BGTOccName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SA4Code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domainId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duplicateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  intermediary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  jobReferenceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  jobType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxAnnualSalary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxExperience?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxHourlySalary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maximumDegree?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minAnnualSalary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minExperience?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minHourlySalary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minimumDegree?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otherDegrees?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferredDegrees?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiredDegrees?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['JobSkills']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  standardMajor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telephone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobCategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['JobCategory'] = ResolversParentTypes['JobCategory']> = {
  avg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobSkillsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['JobSkills'] = ResolversParentTypes['JobSkills']> = {
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType>;
  skillId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addDescription?: Resolver<ResolversTypes['SkillCluster'], ParentType, ContextType, RequireFields<MutationAddDescriptionArgs, 'clusterId'>>;
  deleteDescription?: Resolver<ResolversTypes['SkillCluster'], ParentType, ContextType, RequireFields<MutationDeleteDescriptionArgs, 'clusterId' | 'descriptionId'>>;
  saveSubjectSfia?: Resolver<Maybe<ResolversTypes['SubjectSfiaSkill']>, ParentType, ContextType, RequireFields<MutationSaveSubjectSfiaArgs, 'level' | 'sfiaId' | 'subjectId'>>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateDescription?: Resolver<ResolversTypes['SkillClusterDescription'], ParentType, ContextType, RequireFields<MutationUpdateDescriptionArgs, 'description'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findSubjectSkills?: Resolver<Maybe<ResolversTypes['Subject']>, ParentType, ContextType, RequireFields<QueryFindSubjectSkillsArgs, 'id'>>;
  findSubjects?: Resolver<Array<ResolversTypes['Subject']>, ParentType, ContextType, RequireFields<QueryFindSubjectsArgs, 'query'>>;
  jobCategories?: Resolver<Array<ResolversTypes['JobCategory']>, ParentType, ContextType>;
  jobs?: Resolver<Maybe<Array<ResolversTypes['Job']>>, ParentType, ContextType, RequireFields<QueryJobsArgs, 'id'>>;
  sfia?: Resolver<Maybe<ResolversTypes['SfiaSkill']>, ParentType, ContextType, RequireFields<QuerySfiaArgs, 'id'>>;
  sfias?: Resolver<Array<ResolversTypes['SfiaSkill']>, ParentType, ContextType>;
  skillCluster?: Resolver<Maybe<ResolversTypes['SkillCluster']>, ParentType, ContextType, Partial<QuerySkillClusterArgs>>;
  skillClusters?: Resolver<Array<ResolversTypes['SkillCluster']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SfiaEstimateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SfiaEstimate'] = ResolversParentTypes['SfiaEstimate']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  l1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  l2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  l3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  l4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  l5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  l6?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  l7?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  overall?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sfia?: Resolver<Maybe<ResolversTypes['SfiaSkill']>, ParentType, ContextType>;
  sfiaId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['Subject']>, ParentType, ContextType>;
  subjectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SfiaLevelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SfiaLevel'] = ResolversParentTypes['SfiaLevel']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['SfiaSkill']>, ParentType, ContextType>;
  skillId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SfiaSkillResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SfiaSkill'] = ResolversParentTypes['SfiaSkill']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guidance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  levels?: Resolver<Maybe<Array<ResolversTypes['SfiaLevel']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subjectEstimates?: Resolver<Maybe<Array<ResolversTypes['SfiaEstimate']>>, ParentType, ContextType>;
  subjects?: Resolver<Maybe<Array<ResolversTypes['SubjectSfiaSkill']>>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  cluster?: Resolver<Maybe<ResolversTypes['SkillCluster']>, ParentType, ContextType>;
  clusterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type SubjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subject'] = ResolversParentTypes['Subject']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handbook?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  los?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  losIntro?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  readingList?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sfia?: Resolver<Maybe<Array<ResolversTypes['SubjectSfiaSkill']>>, ParentType, ContextType>;
  sfiaEstimates?: Resolver<Maybe<Array<ResolversTypes['SfiaEstimate']>>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<ResolversTypes['SubjectBgCluster']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubjectBgClusterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubjectBgCluster'] = ResolversParentTypes['SubjectBgCluster']> = {
  cluster?: Resolver<ResolversTypes['SkillCluster'], ParentType, ContextType>;
  clusterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<ResolversTypes['SubjectBgSkill']>>, ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['Subject'], ParentType, ContextType>;
  subjectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubjectBgSkillResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubjectBgSkill'] = ResolversParentTypes['SubjectBgSkill']> = {
  cluster?: Resolver<Maybe<ResolversTypes['SubjectBgCluster']>, ParentType, ContextType>;
  clusterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType>;
  skillId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubjectSfiaSkillResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubjectSfiaSkill'] = ResolversParentTypes['SubjectSfiaSkill']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sfia?: Resolver<Maybe<ResolversTypes['SfiaSkill']>, ParentType, ContextType>;
  sfiaId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['Subject']>, ParentType, ContextType>;
  subjectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Job?: JobResolvers<ContextType>;
  JobCategory?: JobCategoryResolvers<ContextType>;
  JobSkills?: JobSkillsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SfiaEstimate?: SfiaEstimateResolvers<ContextType>;
  SfiaLevel?: SfiaLevelResolvers<ContextType>;
  SfiaSkill?: SfiaSkillResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  SkillCluster?: SkillClusterResolvers<ContextType>;
  SkillClusterDescription?: SkillClusterDescriptionResolvers<ContextType>;
  SkillClusters?: SkillClustersResolvers<ContextType>;
  Subject?: SubjectResolvers<ContextType>;
  SubjectBgCluster?: SubjectBgClusterResolvers<ContextType>;
  SubjectBgSkill?: SubjectBgSkillResolvers<ContextType>;
  SubjectSfiaSkill?: SubjectSfiaSkillResolvers<ContextType>;
};

