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
  jobCategories: Array<JobCategory>;
  jobs?: Maybe<Array<Job>>;
  skillCluster?: Maybe<SkillCluster>;
  skillClusters: Array<SkillCluster>;
  skills: Array<Skill>;
  status?: Maybe<Scalars['String']>;
};


export type QueryJobsArgs = {
  id: Scalars['Int'];
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
