module.exports = {
  apps: [
    {
      name: "sbateh-client",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      max_restarts: 5,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
    },
  ],
};
