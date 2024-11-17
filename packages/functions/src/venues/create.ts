import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Resource } from "sst";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id, id, name, location, created_at, updated_at } = JSON.parse(
    event.body || "{}"
  );

  // Create DynamoDB client
  const client = new DynamoDBClient({});

  // Prepare the item to insert
  const item = {
    user_id: { S: user_id },
    id: { S: id },
    name: { S: name },
    location: { S: location },
    created_at: { S: created_at },
    updated_at: { S: updated_at },
  };

  // Put the item into DynamoDB
  const command = new PutItemCommand({
    TableName: Resource.VENUES_TABLE.name,
    Item: item,
  });

  try {
    await client.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Profile listed successfully" }),
    };
  } catch (error) {
    console.error("Error listing profile:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create profile" }),
    };
  }
};
