// sst.Linkable.wrap(aws.dynamodb.Table, (table) => ({
//   properties: { tableName: table.name },
//   include: [
//     sst.aws.permission({
//       actions: ["dynamodb:*"],
//       resources: [table.arn],
//     }),
//   ],
// }));

export const businessTable = new sst.aws.Dynamo("BusinessTable", {
  // fields: {
  //   id: "string", // Unique ID for each record
  //   country: "string",
  //   city: "string",
  //   emissionFactor: "number",
  //   electricityConsumption: "string",
  //   gasConsumption: "string",
  //   existingLCAs: "string", // List of LCAs JSON string
  //   plannedLCAs: "string", // List of LCAs JSON string
  //   coffeeQuantity: "string",
  //   coffeeOrigin: "string",
  //   coffeeCountry: "string",
  //   deliveryFrequency: "string",
  //   deliveryDistance: "string",
  //   transportMode: "string",
  //   employeeCount: "string",
  //   averageCommute: "string",
  //   commuteMode: "string",
  //   generalWaste: "string",
  //   recyclableWaste: "string",
  // },
  primaryIndex: { hashKey: "id" },
  fields: {
    id: "string",
  },
});

export const profilesTable = new sst.aws.Dynamo("ProfilesTable", {
  // fields: {
  //   user_id: "string",
  //   id: "string",
  //   name: "string",
  //   bio: "string",
  //   created_at: "string",
  //   updated_at: "string",
  // },
  primaryIndex: { hashKey: "user_id", rangeKey: "id" },
  fields: {
    user_id: "string",
    id: "string",
  },
});

// Simple details from 3rd party Auth providers
// export const userDetailsFromAuthProvider = new sst.aws.Dynamo("users", {
//   attributes: [{ name: "userId", type: "S" }],
//   hashKey: "userId",
//   billingMode: "PROVISIONED",
//   readCapacity: 1,
//   writeCapacity: 1,
// });

// Secrets
export const GOOGLE_CLIENT_ID = new sst.Secret("GOOGLE_CLIENT_ID");
export const FACEBOOK_APP_SECRET = new sst.Secret("FACEBOOK_APP_SECRET");
export const FACEBOOK_APP_ID = new sst.Secret("FACEBOOK_APP_ID");

// const stage = $app.local ? "greenmev2" : "prod";
const stage = "qeik";

export const PROFILES_TABLE = new sst.Linkable("PROFILES_TABLE", {
  properties: { name: `green-me-${stage}-ProfilesTableTable` },
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
