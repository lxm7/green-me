/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "green-me",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const api = await import("./infra/api");
    await import("./infra/storage");
    await import("./infra/frontend");
    // const auth = await import("./infra/auth");

    return {
      api: api.api.url,
      Region: aws.getRegionOutput().name,
    };
  },
});
