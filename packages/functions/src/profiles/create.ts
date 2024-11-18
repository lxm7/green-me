import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Resource } from "sst";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const item = {
      user_id: body.user_id,
      id: uuidv4(),
      name: body.name,
      bio: body.bio,
      created_at: body.created_at,
      updated_at: body.updated_at,
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: Resource.PROFILES_TABLE.name,
        Item: item,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data added successfully", id: item.id }),
    };
  } catch (error) {
    console.error("Error adding data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to add data" }),
    };
  }
};
