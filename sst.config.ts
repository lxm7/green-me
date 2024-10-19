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
    const api = new sst.aws.ApiGatewayV2("api");

    api.route("GET /session", {
      handler: "packages/functions/src/session.handler",
    });

    // "GET /profiles": "packages/functions/src/profiles/list.handler",
    // "POST /profiles": "packages/functions/src/profiles/create.handler",
    // "GET /venues": "packages/functions/src/venues/list.handler",
    // "POST /venues": "packages/functions/src/venues/create.handler",

    //     defaults: {
    //       function: {
    //         runtime: "nodejs18.x",

    //         // bind - injects the environment variables directly into the Lambda function
    //         // at runtime and ensures the function has the necessary permissions
    //         bind: [
    //           userDetailsFromAuthProvider,
    //           profilesTable,
    //           venuesTable,
    //           chatsTable,
    //           messagesTable,
    //         ],
    //       },
    //     },
    // });
  },
});
