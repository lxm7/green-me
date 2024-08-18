import { APIGatewayProxyHandler } from "aws-lambda";
import { Client } from "pg";
import { Config } from "sst/node/config";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { chatId, senderProfileId, messageText } = JSON.parse(
    event.body || "{}"
  );

  const client = new Client({
    connectionString: Config.DATABASE_URL,
  });
  await client.connect();
  await client.query(
    "INSERT INTO Messages(chat_id, sender_profile_id, message_text) VALUES($1, $2, $3)",
    [chatId, senderProfileId, messageText]
  );
  await client.end();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Message sent successfully" }),
  };
};
