import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: APIGatewayProxyHandler = async () => {
  const params = {
    TableName: Resource.PROFILES_TABLE.name,
    // No KeyConditionExpression or ExpressionAttributeValues needed for ScanCommand()
  };

  const result = await dynamoDb.send(new ScanCommand(params));

  // Return the list of items in the response body
  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

// export function handlerInner(
//   lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
// ) {
//   return async function (event: APIGatewayProxyEvent, context: Context) {
//     let body: string, statusCode: number;
//     console.log({ event, context });
//     try {
//       // Run the Lambda
//       body = await lambda(event, context);
//       statusCode = 200;
//     } catch (error) {
//       statusCode = 500;
//       body = JSON.stringify({
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }

//     // Return HTTP response
//     return {
//       body,
//       statusCode,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Credentials": true,
//       },
//     };
//   };
// }
