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

export type EmployerCount = {
  __typename?: 'EmployerCount';
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Handbook = {
  __typename?: 'Handbook';
  credits?: Maybe<Scalars['Int']>;
  flagged?: Maybe<Scalars['Boolean']>;
  folder?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  level?: Maybe<Scalars['Int']>;
  nodeId: Scalars['Int'];
  number?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  program?: Maybe<Program>;
  programId?: Maybe<Scalars['Int']>;
  specialisation?: Maybe<Specialisation>;
  specialisationId?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type HandbookInput = {
  credits?: InputMaybe<Scalars['Int']>;
  flagged?: InputMaybe<Scalars['Boolean']>;
  folder?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  nodeId: Scalars['Int'];
  number?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
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

export type JobProfileSkill = {
  __typename?: 'JobProfileSkill';
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  skillId?: Maybe<Scalars['Int']>;
};

export type JobProfileSkillCategory = {
  __typename?: 'JobProfileSkillCategory';
  clusterId?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  skills: Array<JobProfileSkill>;
};

export type JobRoleProfile = {
  __typename?: 'JobRoleProfile';
  average?: Maybe<Scalars['Float']>;
  demand?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  employers: Array<EmployerCount>;
  jobCount?: Maybe<Scalars['Int']>;
  maxSalary?: Maybe<Scalars['Float']>;
  minSalary?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  projection?: Maybe<Scalars['Float']>;
  skills: Array<JobProfileSkillCategory>;
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
  saveProgramHandbook?: Maybe<Program>;
  saveSpecialisationHandbook?: Maybe<Specialisation>;
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


export type MutationSaveProgramHandbookArgs = {
  input: ProgramInput;
};


export type MutationSaveSpecialisationHandbookArgs = {
  input: SpecialisationInput;
};


export type MutationSaveSubjectSfiaArgs = {
  level: Scalars['Int'];
  sfiaId: Scalars['Int'];
  subjectId: Scalars['Int'];
};


export type MutationUpdateDescriptionArgs = {
  description: SkillClusterDescriptionInput;
};

export type Program = {
  __typename?: 'Program';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  handbook?: Maybe<Array<Handbook>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  sequenceSource?: Maybe<Scalars['String']>;
  specialisations?: Maybe<Array<SpecialisationProgram>>;
  structureSource?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ProgramInput = {
  handbook?: InputMaybe<Array<HandbookInput>>;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  findSubjectSkills?: Maybe<Subject>;
  findSubjects: Array<Subject>;
  jobCategories: Array<JobCategory>;
  jobRoleProfile?: Maybe<JobRoleProfile>;
  jobs?: Maybe<Array<Job>>;
  program?: Maybe<Program>;
  programs: Array<Program>;
  sfia?: Maybe<SfiaSkill>;
  sfias: Array<SfiaSkill>;
  skillCluster?: Maybe<SkillCluster>;
  skillClusters: Array<SkillCluster>;
  skills: Array<Skill>;
  specialisation?: Maybe<Specialisation>;
  specialisations: Array<Specialisation>;
  status?: Maybe<Scalars['String']>;
};


export type QueryFindSubjectSkillsArgs = {
  id: Scalars['Int'];
};


export type QueryFindSubjectsArgs = {
  query: Scalars['String'];
};


export type QueryJobRoleProfileArgs = {
  unit: Scalars['Int'];
};


export type QueryJobsArgs = {
  id: Scalars['Int'];
};


export type QueryProgramArgs = {
  id: Scalars['Int'];
};


export type QuerySfiaArgs = {
  id: Scalars['Int'];
};


export type QuerySkillClusterArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySpecialisationArgs = {
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

export type Specialisation = {
  __typename?: 'Specialisation';
  availability?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  handbook?: Maybe<Array<Handbook>>;
  id: Scalars['Int'];
  legacyCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  programs?: Maybe<Array<SpecialisationProgram>>;
  sequenceSource?: Maybe<Scalars['String']>;
  structureSource?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type SpecialisationInput = {
  handbook?: InputMaybe<Array<HandbookInput>>;
  id: Scalars['Int'];
};

export type SpecialisationProgram = {
  __typename?: 'SpecialisationProgram';
  program?: Maybe<Program>;
  programId: Scalars['Int'];
  specialisation?: Maybe<Specialisation>;
  specialisationId: Scalars['Int'];
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
