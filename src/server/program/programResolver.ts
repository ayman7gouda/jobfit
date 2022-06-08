import { Resolvers } from 'generated/serverTypes';

export const programResolvers: Resolvers = {
  Query: {
    programs(_, _args, { db }) {
      return db.program.findMany({});
    },
    program(_, { id }, { db }) {
      return db.program.findFirst({
        where: { id },
        include: { handbook: true },
      });
    },
    specialisations(_, _args, { db }) {
      return db.specialisation.findMany({});
    },
    specialisation(_, { id }, { db }) {
      return db.specialisation.findFirst({
        where: { id },
        include: { handbook: true },
      });
    },
  },
  Mutation: {
    async saveProgramHandbook(_, { input: { id, handbook } }, { db }) {
      const updateNodes = handbook.filter((h) => !!h.id);
      const createNodes = handbook.filter((h) => !h.id);

      const existing = await db.handbook.findMany({
        where: { programId: id },
      });
      const deleteNodes = existing.filter((e) =>
        handbook.every((h) => h.id !== e.id)
      );
      if (deleteNodes.length) {
        await db.handbook.deleteMany({
          where: { id: { in: deleteNodes.map((n) => n.id) } },
        });
      }

      for (let node of updateNodes) {
        const { id, ...other } = node;
        await db.handbook.update({ where: { id: node.id! }, data: other });
      }

      return db.program.update({
        where: { id },
        data: {
          updated: new Date().toISOString(),
          handbook: {
            create: createNodes,
          },
        },
        include: {
          handbook: true,
        },
      });
    },
    async saveSpecialisationHandbook(_, { input: { id, handbook } }, { db }) {
      const updateNodes = handbook.filter((h) => !!h.id);
      const createNodes = handbook.filter((h) => !h.id);

      const existing = await db.handbook.findMany({
        where: { specialisationId: id },
      });
      const deleteNodes = existing.filter((e) =>
        handbook.every((h) => h.id !== e.id)
      );
      if (deleteNodes.length) {
        await db.handbook.deleteMany({
          where: { id: { in: deleteNodes.map((n) => n.id) } },
        });
      }

      for (let node of updateNodes) {
        const { id, ...other } = node;
        await db.handbook.update({ where: { id: node.id! }, data: other });
      }

      return db.specialisation.update({
        where: { id },
        data: {
          updated: new Date().toISOString(),
          handbook: {
            create: createNodes,
          },
        },
        include: {
          handbook: true,
        },
      });
    },
  },
};
