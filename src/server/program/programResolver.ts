import { Resolvers } from "generated/serverTypes";

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
    async saveProgramHandbook(_, { input: { id, ...rest } }, { db }) {
      const updateNodes = rest.handbook!.filter((h) => !!h.id);
      const createNodes = rest.handbook!.filter((h) => !h.id);

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
      });
    },
    async saveSpecialisationHandbook(_, { input: { id, ...rest } }, { db }) {
      const updateNodes = rest.handbook!.filter((h) => !!h.id);
      const createNodes = rest.handbook!.filter((h) => !h.id);

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
      });
    },
  },
};
