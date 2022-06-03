import { Job } from '@prisma/client';

const defaultJob: Job = {
  ANZSCOCode: 0,
  ANZSICCode: "",
  BGTOcc: "",
  BGTOccName: "",
};

export const insert = {
  async jobs(jobs: Job[], clear = true) {
    await prisma.job.deleteMany();
    await prisma.job.createMany({ data: jobs });
  },
};
