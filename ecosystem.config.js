module.exports = {
  apps: [
    {
      name: "jobfit",
      script: "pnpm start",
      env: {
        PORT: "3014",
        DATABASE_URL: "*",
        ROOT_URL: "http://jobfit.trescak.co",
        SECRET: "b6a3fe03ee3a24c495e4eaccb3919867",
        NEXTAUTH_URL: "http://jobfit.trescak.co/api/auth",
        NEXT_PUBLIC_NEXTAUTH_URL: "http://jobfit.trescak.co/api/auth",
        NEXT_PUBLIC_ROOT_URL: "http://jobfit.trescak.co",
      },
    },
  ],
};
