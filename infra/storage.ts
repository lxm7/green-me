// sst.Linkable.wrap(aws.dynamodb.Table, (table) => ({
//   properties: { tableName: table.name },
//   include: [
//     sst.aws.permission({
//       actions: ["dynamodb:*"],
//       resources: [table.arn],
//     }),
//   ],
// }));

// Simple details from 3rd party Auth providers
// export const userDetailsFromAuthProvider = new sst.aws.Dynamo("users", {
//   attributes: [{ name: "userId", type: "S" }],
//   hashKey: "userId",
//   billingMode: "PROVISIONED",
//   readCapacity: 1,
//   writeCapacity: 1,
// });

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

// Secrets
export const GOOGLE_CLIENT_ID = new sst.Secret("GOOGLE_CLIENT_ID");
export const FACEBOOK_APP_SECRET = new sst.Secret("FACEBOOK_APP_SECRET");
export const FACEBOOK_APP_ID = new sst.Secret("FACEBOOK_APP_ID");
export const API_URL = new sst.Secret("API_URL");
export const GOOGLE_AUTH_WEB_APP_ID = new sst.Secret("GOOGLE_AUTH_WEB_APP_ID");
export const GOOGLE_AUTH_ANDROID_APP_ID = new sst.Secret(
  "GOOGLE_AUTH_ANDROID_APP_ID"
);
export const GOOGLE_AUTH_IOS_APP_ID = new sst.Secret("GOOGLE_AUTH_IOS_APP_ID");
export const GOOGLE_MAPS_API_KEY_ANDROID = new sst.Secret(
  "GOOGLE_MAPS_API_KEY_ANDROID"
);
export const CLIMATIQ_API_KEY = new sst.Secret("CLIMATIQ_API_KEY");
export const MAPTILERS_API_KEY = new sst.Secret("MAPTILERS_API_KEY");
export const SUPABASE_PROJECT_ID = new sst.Secret("SUPABASE_PROJECT_ID");
export const SUPABASE_API_KEY = new sst.Secret("SUPABASE_API_KEY");

// const stage = $app.local ? "qeik" : "prod";
const stage = "qeik";

export const PROFILES_TABLE = new sst.Linkable("PROFILES_TABLE", {
  properties: { name: `green-me-${stage}-ProfilesTableTable` },
});
export const BUSINESS_TABLE = new sst.Linkable("BUSINESS_TABLE", {
  properties: { name: `green-me-${stage}-BusinessTableTable` },
});
