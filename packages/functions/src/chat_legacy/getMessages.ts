// @ts-nocheck
import { APIGatewayProxyHandler } from "aws-lambda";
import { Client } from "pg";
import { Resource } from "sst";

export const handler: APIGatewayProxyHandler = async (event) => {
  const chatId = event.pathParameters?.chatId;

  const client = new Client({
    connectionString: Resource.DATABASE_URL.value,
  });
  await client.connect();
  const result = await client.query(
    "SELECT * FROM Messages WHERE chat_id = $1 ORDER BY sent_at ASC",
    [chatId]
  );
  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify(result.rows),
  };
};
