// @ts-nocheck
import { APIGatewayProxyHandler } from "aws-lambda";
import { Client } from "pg";
import { Resource } from "sst";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { chatId, senderProfileId, messageText } = JSON.parse(
    event.body || "{}"
  );

  const client = new Client({
    connectionString: Resource.DATABASE_URL.value,
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
