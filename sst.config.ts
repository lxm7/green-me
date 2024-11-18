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
    await import("./infra/api");
    await import("./infra/storage");
    await import("./infra/frontend");

    return {
      Region: aws.getRegionOutput().name,
    };
  },
});
