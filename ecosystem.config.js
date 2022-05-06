module.exports = {
  apps: [
    {
      name: "jobfit",
      script: "pnpm start",
      env: {
        PORT: "3014",
        DATABASE_URL: "*",
        ROOT_URL: "http://jobfit.trescak.co",
      },
    },
  ],
};
