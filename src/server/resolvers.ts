import { Resolvers } from "generated/serverTypes";
import merge from "lodash/merge";

import { jobResolvers } from "./job/jobResolver";
import { programResolvers } from "./program/programResolver";
import { skillResolvers } from "./skill/skillResolver";
import { subjectResolvers } from "./subject/subjectResolver";

export const resolvers: Resolvers = merge(
  jobResolvers,
  skillResolvers,
  subjectResolvers,
  programResolvers
);
