import {
  profilesTable,
  businessTable,
  PROFILES_TABLE,
  BUSINESS_TABLE,
} from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [profilesTable, PROFILES_TABLE, businessTable, BUSINESS_TABLE],
      },
      // args: {
      //   auth: { iam: true },
      // },
    },
  },
});

api.route("GET /profiles", "packages/functions/src/profiles/list.handler");
api.route("POST /profiles", "packages/functions/src/profiles/create.handler");
api.route("POST /business", "packages/functions/src/business/create.handler");
