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
  findSubject: Array<Subject>;
  jobCategories: Array<JobCategory>;
  jobs?: Maybe<Array<Job>>;
  sfia?: Maybe<SfiaSkill>;
  skillCluster?: Maybe<SkillCluster>;
  skillClusters: Array<SkillCluster>;
  skills: Array<Skill>;
  status?: Maybe<Scalars['String']>;
  subjectEstimates: Array<SfiaEstimate>;
  subjectSfia: Array<SubjectSfiaSkill>;
};


export type QueryFindSubjectArgs = {
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


export type QuerySubjectEstimatesArgs = {
  id: Scalars['Int'];
};


export type QuerySubjectSfiaArgs = {
  id: Scalars['Int'];
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
