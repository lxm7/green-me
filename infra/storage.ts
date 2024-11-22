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
  primaryIndex: { hashKey: "id" },
  fields: {
    id: "string",
  },
});

export const profilesTable = new sst.aws.Dynamo("ProfilesTable", {
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

export const PROFILES_TABLE = new sst.Linkable("PROFILES_TABLE", {
  properties: { name: `green-me-${$app.stage}-ProfilesTableTable` },
});
export const BUSINESS_TABLE = new sst.Linkable("BUSINESS_TABLE", {
  properties: { name: `green-me-${$app.stage}-BusinessTableTable` },
});
