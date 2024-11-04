import {
  StackContext,
  Api,
  Auth,
  StaticSite,
  Table,
  Config,
} from "sst/constructs";

export function ExampleStack({ app, stack }: StackContext) {
  app.setDefaultRemovalPolicy("retain");

  // Simple details from 3rd party Auth providers
  const userDetailsFromAuthProvider = new Table(stack, "users", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  });

  // const userSettings = new Table(stack, "UsersTable", {
  //   fields: {
  //     id: "string",
  //     email: "string",
  //   },
  //   primaryIndex: { partitionKey: "id" },
  //   globalIndexes: {
  //     emailIndex: { partitionKey: "email" },
  //   },
  // });

  const stage = app.local ? "greenmev2" : "prod";

  new Config.Parameter(stack, "PROFILES_TABLE", {
    value: `${stage}-green-one-auth-ProfilesTable`,
  });
  new Config.Parameter(stack, "VENUES_TABLE", {
    value: `${stage}-green-one-auth-VenuesTable`,
  });
  new Config.Parameter(stack, "CHATS_TABLE", {
    value: `${stage}-green-one-auth-ChatsTable`,
  });
  new Config.Parameter(stack, "MESSAGES_TABLE", {
    value: `${stage}-green-one-auth-MessagesTable`,
  });
  new Config.Parameter(stack, "BUSINESS_TABLE", {
    value: `${stage}-green-one-auth-BusinessTable`,
  });

  const businessTable = new Table(stack, "BusinessTable", {
    fields: {
      id: "string", // Unique ID for each record
      country: "string",
      city: "string",
      emissionFactor: "number",
      electricityConsumption: "string",
      gasConsumption: "string",
      existingLCAs: "string", // List of LCAs JSON string
      plannedLCAs: "string", // List of LCAs JSON string
      coffeeQuantity: "string",
      coffeeOrigin: "string",
      coffeeCountry: "string",
      deliveryFrequency: "string",
      deliveryDistance: "string",
      transportMode: "string",
      employeeCount: "string",
      averageCommute: "string",
      commuteMode: "string",
      generalWaste: "string",
      recyclableWaste: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const profilesTable = new Table(stack, "ProfilesTable", {
    fields: {
      user_id: "string",
      id: "string",
      name: "string",
      bio: "string",
      created_at: "string",
      updated_at: "string",
    },
    primaryIndex: { partitionKey: "user_id", sortKey: "id" },
  });

  const venuesTable = new Table(stack, "VenuesTable", {
    fields: {
      user_id: "string",
      id: "string",
      name: "string",
      location: "string",
      created_at: "string",
      updated_at: "string",
    },
    primaryIndex: { partitionKey: "user_id", sortKey: "id" },
  });

  const chatsTable = new Table(stack, "ChatsTable", {
    fields: {
      venue_id: "string",
      id: "string",
      profile_id: "string",
      created_at: "string",
      updated_at: "string",
    },
    primaryIndex: { partitionKey: "venue_id", sortKey: "id" },
    globalIndexes: {
      profileIndex: { partitionKey: "profile_id" },
    },
  });

  const messagesTable = new Table(stack, "MessagesTable", {
    fields: {
      chat_id: "string",
      sent_at: "string",
      sender_id: "string",
      content: "string",
    },
    primaryIndex: { partitionKey: "chat_id", sortKey: "sent_at" },
  });

  // Create Api
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        runtime: "nodejs18.x",

        // bind - injects the environment variables directly into the Lambda function
        // at runtime and ensures the function has the necessary permissions
        bind: [
          userDetailsFromAuthProvider,
          profilesTable,
          venuesTable,
          chatsTable,
          messagesTable,
          businessTable,
        ],
      },
    },
    routes: {
      "GET /session": "packages/functions/src/session.handler",
      "GET /profiles": "packages/functions/src/profiles/list.handler",
      "POST /profiles": "packages/functions/src/profiles/create.handler",
      "GET /venues": "packages/functions/src/venues/list.handler",
      "POST /venues": "packages/functions/src/venues/create.handler",
      "POST /business": "packages/functions/src/business/create.handler",
      // "POST /chat/message": "packages/functions/src/chat/sendMessage.handler",
      // "GET /chat/{chatId}/messages":
      //   "packages/functions/src/chat/getMessages.handler",
    },
  });

  // Create a static site
  const site = new StaticSite(stack, "site", {
    path: "expo-next",
    // no generated hash for mp4 asset in the build even tho metro is flagged to use mp4??
    buildCommand: "npm run build",
    buildOutput: "dist",
    // bind mainDb incase we should call direct to db from getServerSideProps or getStaticProps
    // bind: [
    //   userDetailsFromAuthProvider,
    //   profilesTable,
    //   venuesTable,
    //   chatsTable,
    //   messagesTable,
    // ],
    // environment - doesnt require permissions, more static value
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    },
    // runtime: "nodejs20.x",
  });

  // Create Auth provider
  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      bind: [
        site,
        new Config.Secret(stack, "FACEBOOK_APP_ID"),
        new Config.Secret(stack, "FACEBOOK_APP_SECRET"),
        new Config.Secret(stack, "GOOGLE_CLIENT_ID"),
      ],
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteURL: site.url,
  });
}
