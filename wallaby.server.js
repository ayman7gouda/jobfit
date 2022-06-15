module.exports = function (wallaby) {
  process.env.MYSQL_URL =
    "mysql://jobfitadmin:!!Kosicka9!!@trescak.synology.me:3306/jobfit-test";

  return {
    files: ["src/server/**/*.ts", "!src/server/**/tests/*.ts"],
    tests: ["src/server/**/tests/*.ts"],
    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        module: "commonjs",
      }),
    },
    env: {
      type: "node",
      runner: "node",
    },
    setup: function (w) {
      const { PrismaClient } = require("@prisma/client");
      if (global.prisma == null) {
        const prisma = new PrismaClient({
          log: ["query", "info", "warn", "error"],
        });
        global.prisma = prisma;
      }
    },
    teardown: async function (w) {
      await global.prisma.$disconnect();
    },
  };
};
