import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

import { Context, APIGatewayProxyEvent } from "aws-lambda";

export module Util {
  export function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: number;

      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }

      // Return HTTP response
      return {
        body,
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    };
  }
}

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.PROFILES_TABLE.name,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "user_id = :user_id",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    // ExpressionAttributeValues: {
    //   ":user_id":
    //     event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    // },
  };

  const result = await dynamoDb.send(new QueryCommand(params));

  // Return the matching list of items in response body
  return JSON.stringify(result.Items);
});

// export const handler: APIGatewayProxyHandler = async (event) => {
//   // Initialize DynamoDB client
//   const client = new DynamoDBClient({});
//   try {
//     // Scan the entire VenuesTable to retrieve all items (Note: use with caution on large tables)
//     const params = {
//       TableName: Resource.PROFILES_TABLE.name,
//       // 'KeyConditionExpression' defines the condition for the query
//       // - 'userId = :userId': only return items with matching 'userId'
//       //   partition key
//       KeyConditionExpression: "user_id = :user_id",
//       // 'ExpressionAttributeValues' defines the value in the condition
//       // - ':userId': defines 'userId' to be the id of the author
//       // ExpressionAttributeValues: {
//       //   ":userId":
//       //     event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
//       // },
//     };

//     // const result = await client.send(command);
//     // const result = await client.send(new QueryCommand(params));

//     // Unmarshall DynamoDB items to JavaScript objects
//     // const items = result.Items?.map((item) => unmarshall(item)) || [];

//     const result = await client.send(
//       new ScanCommand({ TableName: Resource.PROFILES_TABLE.name })
//     );

//     const items = result.Items || [];

//     return {
//       statusCode: 200,
//       body: JSON.stringify(items),
//     };
//   } catch (error) {
//     console.error("Error fetching data from DynamoDB:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: "Failed to fetch data" }),
//     };
//   }
// };
