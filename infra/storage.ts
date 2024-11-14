sst.Linkable.wrap(aws.dynamodb.Table, (table) => ({
  properties: { tableName: table.name },
  include: [
    sst.aws.permission({
      actions: ["dynamodb:*"],
      resources: [table.arn],
    }),
  ],
}));

// Simple details from 3rd party Auth providers
export const userDetailsFromAuthProvider = new aws.dynamodb.Table("users", {
  attributes: [{ name: "userId", type: "S" }],
  hashKey: "userId",
  billingMode: "PROVISIONED",
  readCapacity: 1,
  writeCapacity: 1,
});

export const businessTable = new aws.dynamodb.Table("BusinessTable", {
  attributes: [{ name: "id", type: "S" }],
  // id: "string", // Unique ID for each record
  // country: "string",
  // city: "string",
  // emissionFactor: "number",
  // electricityConsumption: "string",
  // gasConsumption: "string",
  // existingLCAs: "string", // List of LCAs JSON string
  // plannedLCAs: "string", // List of LCAs JSON string
  // coffeeQuantity: "string",
  // coffeeOrigin: "string",
  // coffeeCountry: "string",
  // deliveryFrequency: "string",
  // deliveryDistance: "string",
  // transportMode: "string",
  // employeeCount: "string",
  // averageCommute: "string",
  // commuteMode: "string",
  // generalWaste: "string",
  // recyclableWaste: "string",
  // },
  hashKey: "id",
  billingMode: "PROVISIONED",
  readCapacity: 1,
  writeCapacity: 1,
});

export const profilesTable = new aws.dynamodb.Table("ProfilesTable", {
  attributes: [{ name: "user_id", type: "S" }],
  // fields: {
  // user_id: "string",
  // id: "string",
  // name: "string",
  // bio: "string",
  // created_at: "string",
  // updated_at: "string",
  // },
  hashKey: "user_id", //  }, // sortKey: "id" },
  billingMode: "PROVISIONED",
  readCapacity: 1,
  writeCapacity: 1,
});

export const venuesTable = new aws.dynamodb.Table("VenuesTable", {
  attributes: [{ name: "user_id", type: "S" }],
  // fields: {
  //   user_id: "string",
  // id: "string",
  // name: "string",
  // location: "string",
  // created_at: "string",
  // updated_at: "string",
  // },
  hashKey: "user_id", // }, // sortKey: "id" },
  billingMode: "PROVISIONED",
  readCapacity: 1,
  writeCapacity: 1,
});

export const chatsTable = new aws.dynamodb.Table("ChatsTable", {
  attributes: [{ name: "venue_id", type: "S" }],
  // fields: {
  //   venue_id: "string",
  // id: "string",
  // profile_id: "string",
  // created_at: "string",
  // updated_at: "string",
  // },
  hashKey: "venue_id", // }, // sortKey: "id" },
  // globalIndexes: {
  //   profileIndex: { hashKey: "profile_id" },
  // },
  billingMode: "PROVISIONED",
  readCapacity: 1,
  writeCapacity: 1,
});

export const messagesTable = new aws.dynamodb.Table("MessagesTable", {
  attributes: [{ name: "chat_id", type: "S" }],
  // fields: {
  //   chat_id: "string",
  // sent_at: "string",
  // sender_id: "string",
  // content: "string",
  // },
  hashKey: "chat_id", // }, // sortKey: "sent_at" },
  billingMode: "PROVISIONED",
  readCapacity: 1,
  writeCapacity: 1,
});

// Secrets
export const GOOGLE_CLIENT_ID = new sst.Secret("GOOGLE_CLIENT_ID");
export const FACEBOOK_APP_SECRET = new sst.Secret("FACEBOOK_APP_SECRET");
export const FACEBOOK_APP_ID = new sst.Secret("FACEBOOK_APP_ID");

// const stage = $app.local ? "greenmev2" : "prod";
const stage = "greenmev2";

export const PROFILES_TABLE = new sst.Linkable("PROFILES_TABLE", {
  properties: { name: `${stage}-green-one-auth-ProfilesTable` },
});
export const VENUES_TABLE = new sst.Linkable("VENUES_TABLE", {
  properties: { name: `${stage}-green-one-auth-VenuesTable` },
});
export const CHATS_TABLE = new sst.Linkable("CHATS_TABLE", {
  properties: { name: `${stage}-green-one-auth-ChatsTable` },
});
export const MESSAGES_TABLE = new sst.Linkable("MESSAGES_TABLE", {
  properties: { name: `${stage}-green-one-auth-MessagesTable` },
});
export const BUSINESS_TABLE = new sst.Linkable("BUSINESS_TABLE", {
  properties: { name: `${stage}-green-one-auth-BusinessTable` },
});
