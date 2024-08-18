import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const seedData = async () => {
  const dynamoDb = new DynamoDBClient({
    region: "us-east-1",
  });

  const profiles = [
    {
      user_id: "user1",
      id: "profile1",
      name: "John Doe",
      bio: "Software engineer with a passion for coding.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      user_id: "user2",
      id: "profile2",
      name: "Jane Doe",
      bio: "Graphic designer who loves to create digital art.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const venues = [
    {
      user_id: "user1",
      id: "venue1",
      name: "Tech Conference Hall",
      location: "1234 Main St, Tech City",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      user_id: "user2",
      id: "venue2",
      name: "Art Exhibition Center",
      location: "5678 Art Blvd, Creative Town",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  // Seed Users Table
  for (const venue of venues) {
    await dynamoDb.send(
      new PutItemCommand({
        TableName: "greenmev2-green-one-auth-VenuesTable",
        Item: marshall(venue),
      })
    );
  }

  // and for prod
  for (const venue of venues) {
    await dynamoDb.send(
      new PutItemCommand({
        TableName: "prod-green-one-auth-VenuesTable",
        Item: marshall(venue),
      })
    );
  }

  // Seed Profiles Table
  for (const profile of profiles) {
    await dynamoDb.send(
      new PutItemCommand({
        TableName: "prod-green-one-auth-ProfilesTable",
        Item: marshall(profile),
      })
    );
  }

  // and for prod
  for (const profile of profiles) {
    await dynamoDb.send(
      new PutItemCommand({
        TableName: "prod-green-one-auth-ProfilesTable",
        Item: marshall(profile),
      })
    );
  }

  // Add seeding for other tables similarly...
  console.log("Seeding completed!");
};

seedData().catch(console.error);
