import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
  },
];

const skillData: Prisma.SkillCreateInput[] = [
  {
    name: "Skill 1",
    description: "Skill 1 Description",
    framework: "Sfia",
  },
  {
    name: "Skill 2",
    description: "Skill 2 Description",
    framework: "Sfia",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const u of skillData) {
    const skill = await prisma.skill.create({
      data: u,
    });
    console.log(`Created skill with id: ${skill.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
