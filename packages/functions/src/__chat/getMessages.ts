import { APIGatewayProxyHandler } from "aws-lambda";
import { Client } from "pg";
import { Config } from "sst/node/config";

export const handler: APIGatewayProxyHandler = async (event) => {
  const chatId = event.pathParameters?.chatId;

  const client = new Client({
    connectionString: Config.DATABASE_URL,
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
