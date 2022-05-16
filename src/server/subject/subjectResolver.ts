import { Resolvers } from 'generated/serverTypes';

export const subjectResolvers: Resolvers = {
  Query: {
    sfia(_, { id }, { db }) {
      return db.sfiaSkill.findFirst({ where: { id } });
    },
    findSubject(_, { query }, { db }) {
      return db.subject.findMany({
        where: {
          OR: [{ code: { contains: query } }, { name: { contains: query } }],
        },
        take: 20,
      });
    },
    subjectEstimates(_, { id }, { db }) {
      return db.sfiaEstimate.findMany({
        where: { subjectId: id },
      });
    },
    subjectSfia(_, { id }, { db }) {
      return db.subjectSfiaSkill.findMany({
        where: { subjectId: id },
      });
    },
  },
  Mutation: {
    async saveSubjectSfia(_, { subjectId, sfiaId, level }, { db }) {
      let existing = await db.subjectSfiaSkill.findFirst({
        where: { sfiaId, subjectId },
      });

      if (existing) {
        return db.subjectSfiaSkill.update({
          where: { id: existing.id },
          data: {
            subjectId,
            sfiaId,
            level,
          },
        });
      }
      return db.subjectSfiaSkill.create({
        data: {
          subjectId,
          sfiaId,
          level,
        },
      });
    },
  },
};
