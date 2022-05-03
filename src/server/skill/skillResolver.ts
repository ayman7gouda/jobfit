import { Resolvers } from 'generated/serverTypes';

export const skillResolvers: Resolvers = {
  Query: {
    skills(_, _args, { db }) {
      return db.skill.findMany();
    },
    skillClusters(_, _args, { db }) {
      return db.skillCluster.findMany({
        include: {
          descriptions: true,
          skills: true,
        },
      });
    },
    async skillCluster(_, { id }, { db }) {
      return db.skillCluster.findFirst({
        where: { id: id! },
        include: {
          descriptions: true,
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });
    },
  },
  Mutation: {
    addDescription(_, { clusterId }, { db }) {
      return db.skillCluster.update({
        where: { id: clusterId },
        data: {
          descriptions: {
            create: { description: "", name: "New Description", source: "" },
          },
        },
        include: {
          descriptions: true,
        },
      });
    },
    async deleteDescription(_, { clusterId, descriptionId }, { db }) {
      let result = await db.skillCluster.update({
        where: { id: clusterId },
        data: { descriptions: { delete: { id: descriptionId } } },
        include: {
          descriptions: true,
        },
      });
      // await db.skillClusterDescription.delete({ where: { id: descriptionId } });
      return result;
    },
    updateDescription(_, { description }, { db }) {
      const { id, ...rest } = description;
      return db.skillClusterDescription.update({
        where: { id: id },
        data: rest,
      });
    },
  },
};
