import { Resolvers } from 'generated/serverTypes';

export const skillResolvers: Resolvers = {
  Query: {
    skills(_, _args, { db }) {
      return db.skill.findMany();
    },
  },
  Mutation: {
    insertSkill(_, { skill }, { db }) {
      return db.skill.create({ data: skill });
    },
  },
};
