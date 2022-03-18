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
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  insertSkill?: Maybe<Skill>;
  status?: Maybe<Scalars['String']>;
};


export type MutationInsertSkillArgs = {
  skill?: InputMaybe<SkillInput>;
};

export type Query = {
  __typename?: 'Query';
  jobs: Array<Job>;
  skills: Array<Skill>;
  status?: Maybe<Scalars['String']>;
};

export type Skill = {
  __typename?: 'Skill';
  description: Scalars['String'];
  framework: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum SkillFramework {
  BurningGlass = 'BurningGlass',
  Cbok = 'Cbok',
  Generic = 'Generic',
  Sfia = 'Sfia'
}

export type SkillInput = {
  description: Scalars['String'];
  framework: SkillFramework;
  name: Scalars['String'];
};
