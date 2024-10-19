import sst from "sst";

export function ExampleStack({ app, stack }: StackContext) {
  // Simple details from 3rd party Auth providers
  const userDetailsFromAuthProvider = new sst.aws.Table(stack, "users", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  });

  // const userSettings = new sst.aws.Table(stack, "UsersTable", {
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

  new sst.aws.Config.Parameter(stack, "PROFILES_TABLE", {
    value: `${stage}-green-one-auth-ProfilesTable`,
  });
  new sst.aws.Config.Parameter(stack, "VENUES_TABLE", {
    value: `${stage}-green-one-auth-VenuesTable`,
  });
  new sst.aws.Config.Parameter(stack, "CHATS_TABLE", {
    value: `${stage}-green-one-auth-ChatsTable`,
  });
  new sst.aws.Config.Parameter(stack, "MESSAGES_TABLE", {
    value: `${stage}-green-one-auth-MessagesTable`,
  });

  const profilesTable = new sst.aws.Table(stack, "ProfilesTable", {
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

  const venuesTable = new sst.aws.Table(stack, "VenuesTable", {
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

  const chatsTable = new sst.aws.Table(stack, "ChatsTable", {
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

  const messagesTable = new sst.aws.Table(stack, "MessagesTable", {
    fields: {
      chat_id: "string",
      sent_at: "string",
      sender_id: "string",
      content: "string",
    },
    primaryIndex: { partitionKey: "chat_id", sortKey: "sent_at" },
  });

  // Create Api
  

  // Create a static site
  const site = new sst.aws.StaticSite(stack, "site", {
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
  const auth = new sst.aws.Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      bind: [
        site,
        new sst.Secret("FACEBOOK_APP_ID"),
        new sst.Secret("FACEBOOK_APP_SECRET"),
        new sst.Secret("GOOGLE_CLIENT_ID"),
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
