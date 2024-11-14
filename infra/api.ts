import {
  userDetailsFromAuthProvider,
  profilesTable,
  venuesTable,
  chatsTable,
  messagesTable,
  businessTable,
  PROFILES_TABLE,
  VENUES_TABLE,
  CHATS_TABLE,
  MESSAGES_TABLE,
  BUSINESS_TABLE,
} from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [
          userDetailsFromAuthProvider,
          profilesTable,
          venuesTable,
          chatsTable,
          messagesTable,
          businessTable,
          PROFILES_TABLE,
          VENUES_TABLE,
          CHATS_TABLE,
          MESSAGES_TABLE,
          BUSINESS_TABLE,
        ],
        // permissions: [
        //   profilesTable, // SST will grant common permissions for this table
        //   businessTable,
        //   // For custom permissions, you can specify actions and resources
        //   // {
        //   //   Effect: "Allow",
        //   //   Action: ["dynamodb:Scan"],
        //   //   Resource: [profilesTable.tableArn],
        //   // },
        // ],
      },

      // args: {
      //   auth: { iam: true },
      // },

      //   authorizer: {
      //     type: "lambda",
      //     function: authFunction,
      //     identitySources: ["method.request.header.Authorization"],
      //   },
      // },
    },
  },
  // defaults: {
  //   function: {
  //     runtime: "nodejs18.x",

  //     // bind - injects the environment variables directly into the Lambda function
  //     // at runtime and ensures the function has the necessary permissions
  //     bind: [
  //       userDetailsFromAuthProvider,
  //       profilesTable,
  //       venuesTable,
  //       chatsTable,
  //       messagesTable,
  //       businessTable,
  //     ],
  //   },
  // },
});

api.route("GET /session", "packages/functions/src/session.handler");
api.route("GET /profiles", "packages/functions/src/profiles/list.handler");
api.route("POST /profiles", "packages/functions/src/profiles/create.handler");
api.route("GET /venues", "packages/functions/src/venues/list.handler");
api.route("POST /venues", "packages/functions/src/venues/create.handler");
api.route("POST /business", "packages/functions/src/business/create.handler");
// "POST /chat/message": "packages/functions/src/chat/sendMessage.handler",
// "GET /chat/{chatId}/messages":
//   "packages/functions/src/chat/getMessages.handler",
