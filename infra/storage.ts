// Simple details from 3rd party Auth providers
export const userDetailsFromAuthProvider = new sst.aws.Dynamo("users", {
  fields: {
    userId: "string",
  },
  primaryIndex: { hashKey: "userId" },
});

export const businessTable = new sst.aws.Dynamo("BusinessTable", {
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
  primaryIndex: { hashKey: "id" },
});

export const profilesTable = new sst.aws.Dynamo("ProfilesTable", {
  fields: {
    user_id: "string",
    id: "string",
    name: "string",
    bio: "string",
    created_at: "string",
    updated_at: "string",
  },
  primaryIndex: { hashKey: "user_id" }, // sortKey: "id" },
});

export const venuesTable = new sst.aws.Dynamo("VenuesTable", {
  fields: {
    user_id: "string",
    id: "string",
    name: "string",
    location: "string",
    created_at: "string",
    updated_at: "string",
  },
  primaryIndex: { hashKey: "user_id" }, // sortKey: "id" },
});

export const chatsTable = new sst.aws.Dynamo("ChatsTable", {
  fields: {
    venue_id: "string",
    id: "string",
    profile_id: "string",
    created_at: "string",
    updated_at: "string",
  },
  primaryIndex: { hashKey: "venue_id" }, // sortKey: "id" },
  // globalIndexes: {
  //   profileIndex: { hashKey: "profile_id" },
  // },
});

export const messagesTable = new sst.aws.Dynamo("MessagesTable", {
  fields: {
    chat_id: "string",
    sent_at: "string",
    sender_id: "string",
    content: "string",
  },
  primaryIndex: { hashKey: "chat_id" }, // sortKey: "sent_at" },
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
