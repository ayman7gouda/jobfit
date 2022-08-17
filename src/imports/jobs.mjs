import  { PrismaClient } from "@prisma/client";

function getDate() {
  const yearOffset = 2;
  let year = new Date().getFullYear() - yearOffset;
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  // let dateString = `${year - 1}-${month.toString().padStart(2, "0")}-${day
  //   .toString()
  //   .padStart(2, "0")}`;
  return year * 10000 + month * 100 + day;
}

let prisma = new PrismaClient();

export async function getJobs(unit) {
  return prisma.job.findMany({
    where: {
      ANZSCO: {
        unit,
      },
      
    },
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
  });
}

async function main() {
    try {
        let jobs = await getJobs(2611);
        console.log(jobs);
    } 
    catch(ex) {
        console.log("Error")
    }
    finally {
        prisma.$disconnect();
    }
}

main();

// export async function getCategories(prisma: PrismaClient) {
//   return prisma.anzscoJob.groupBy({
//     by: ["unit"],
//     where: {
//       date: {
//         gte: getDate(),
//       },
//     },
//     _count: {
//       unit: true,
//     },
//     _avg: {
//       maxAnnualSalary: true,
//     },
//     _min: {
//       maxAnnualSalary: true,
//     },
//     _max: {
//       maxAnnualSalary: true,
//     },
//   });
// }

// export async function findEmployers(prisma: PrismaClient, unit: number) {
//   let employers = await prisma.anzscoJob.groupBy({
//     by: ["employer"],
//     where: {
//       unit,
//       employer: { not: "" },
//     },
//     _count: {
//       employer: true,
//     },
//   });
//   employers.sort((a, b) => (a._count.employer < b._count.employer ? 1 : -1));
//   return employers;
// }

// export function calculateDemand(jobCount: number, average: number) {
//   return jobCount > average * 2.5
//     ? "very high"
//     : jobCount > average * 1.5
//     ? "high"
//     : jobCount < average * 0.5
//     ? "lower"
//     : jobCount < average * 0.75
//     ? "much lower"
//     : "average";
// }

// export function extractJobSkills(jobs: Job[]) {
//   let skills = jobs.reduce((p, n) => {
//     for (let skill of n.skills) {
//       for (let cluster of skill.skill.clusters) {
//         let existingCluster = p.find((e) => e.clusterId === cluster.clusterId);
//         if (existingCluster) {
//           existingCluster.count++;
//         } else {
//           existingCluster = {
//             clusterId: cluster.clusterId,
//             name: cluster.cluster.name,
//             count: 1,
//             skills: [],
//           };
//           p.push(existingCluster);
//         }

//         let existingSkill = existingCluster.skills.find(
//           (e) => e.skillId === skill.skillId
//         );
//         if (existingSkill) {
//           existingSkill.count++;
//         } else {
//           existingCluster.skills.push({
//             skillId: skill.skillId,
//             name: skill.skill.name,
//             count: 1,
//           });
//         }
//       }
//     }
//     return p;
//   }, [] as Array<{ clusterId: number; name: string; count: number; skills: Array<{ skillId: number; name: string; count: number }> }>);

//   let average = skills.reduce((p, n) => p + n.count, 0) / skills.length;
//   let filtered = skills
//     .filter((s) => s.count >= average / 2)
//     .sort((a, b) => (a.count < b.count ? 1 : -1));

//   skills = filtered;
//   skills.forEach((s) => {
//     // remove the less than average amount of skills
//     let average = s.skills.reduce((p, n) => p + n.count, 0) / s.skills.length;
//     let filtered = s.skills
//       .filter((s) => s.count >= average / 2)
//       .sort((a, b) => (a.count < b.count ? 1 : -1));

//     s.skills = filtered;
//   });

//   return skills;
// }
