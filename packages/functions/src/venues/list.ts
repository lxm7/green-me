import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Resource } from "sst";

export const handler: APIGatewayProxyHandler = async () => {
  // Initialize DynamoDB client
  const client = new DynamoDBClient({});
  try {
    // Scan the entire VenuesTable to retrieve all items (Note: use with caution on large tables)
    const command = new ScanCommand({
      TableName: Resource.VENUES_TABLE.name,
    });

    const result = await client.send(command);

    // Unmarshall DynamoDB items to JavaScript objects
    const items = result.Items?.map((item) => unmarshall(item)) || [];

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch data" }),
    };
  }
};
