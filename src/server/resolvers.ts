import { Resolvers } from 'generated/serverTypes';
import merge from 'lodash/merge';

import { jobResolvers } from './job/jobResolver';
import { skillResolvers } from './skill/skillResolver';

export const resolvers: Resolvers = merge(jobResolvers, skillResolvers);
