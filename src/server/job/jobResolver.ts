import { JobCategory, Resolvers } from 'generated/serverTypes';

import {
  calculateDemand, extractJobSkills, findEmployers, getCategories, getJobs
} from './jobHelpers';

const avg = (arr) => arr.reduce((acc, v, i, a) => acc + v / a.length, 0);
const sum = (arr) => arr.reduce((a, b) => a + b);

export const jobResolvers: Resolvers = {
  Query: {
    async jobs(_, { id }, { db }) {
      const filter =
        id < 10
          ? { major: id }
          : id < 100
          ? { subMajor: id }
          : id < 1000
          ? { minor: id }
          : id < 10000
          ? { unit: id }
          : { id: id };
      const result = await db.job.findMany({
        where: { minAnnualSalary: { gte: 0 }, ANZSCO: filter },
        include: {
          skills: {
            include: {
              skill: {
                include: {
                  clusters: {
                    include: {
                      cluster: true,
                    },
                  },
                },
              },
            },
          },
        },
        take: 500,
      });
      // const result = await db.$queryRaw<Job[]>`
      // SELECT * FROM Job WHERE minAnnualSalary IS NOT NULL AND FLOOR(ANZSCOCode / ${division}) = ${id} LIMIT 500`;
      return result;
    },
    async jobRoleProfile(_, { unit }, { db }) {
      const jobs = await getJobs(db, unit);
      const categories = await getCategories(db);

      // this one is for the description
      const anzsco = await db.aNZSCO.findFirst({ where: { id: unit } });

      const jobCount = jobs.length;

      // find who are the employers
      const employers = await findEmployers(db, unit);

      // demand in comparison to other jobs
      const average =
        categories.reduce((p, n) => p + n._count.unit, 0) / categories.length;
      const demand = calculateDemand(jobCount, average);

      // find the projection for the current job
      const projection = await db.jobProjections.findFirst({
        where: { id: unit },
      });

      // the category produces averages and min and max salary
      let category = categories.find((c) => c.unit === unit);

      // aggregate skills
      const skills = extractJobSkills(jobs);

      return {
        name: anzsco.name,
        description: anzsco.description,
        demand,
        jobCount,
        average,
        minSalary: category._min.maxAnnualSalary,
        maxSalary: category._max.maxAnnualSalary,
        avgSalary: category._avg.maxAnnualSalary,
        employers: employers
          .slice(0, 10)
          .map((e) => ({ name: e.employer, count: e._count.employer })),
        projection: projection?.growth,
        skills,
      };
    },
    async jobCategories(_, _args, { db }) {
      const result = await db.$queryRaw<JobCategory[]>`
        SELECT A.ANZSCOCode as "id",
               B.Name as "name",
               COUNT(*) as "count",
               AVG(A.maxAnnualSalary) as "avg",
               MIN(A.maxAnnualSalary) as "min",
               MAX(A.maxAnnualSalary) as "max"
        FROM Job as A, ANZSCO as B
        WHERE A.minHourlySalary>0 AND A.ANZSCOCode=B.id
        GROUP BY ANZSCOCode`;

      let categories = await db.aNZSCO.findMany({
        where: { id: { lt: 100000 } },
      });
      let groups = categories.map((c) => {
        const items = result.filter((r) =>
          r.id.toString().startsWith(c.id.toString())
        );
        if (items.length == 0) {
          return null;
        }
        return {
          id: c.id,
          name: c.name,
          min: Math.min(...items.map((i) => i.min)),
          max: Math.max(...items.map((i) => i.max)),
          avg: avg(items.map((i) => i.avg)),
          count: sum(items.map((i) => i.count)),
        };
      });
      // filter out the nulls
      groups = groups.filter((g) => !!g);

      return result.concat(groups) as any;
    },
  },
};
