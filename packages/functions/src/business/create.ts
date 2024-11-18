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
      id: uuidv4(),
      country: body.country || "UK",
      city: body.city || "",
      emissionFactor: body.emissionFactor || 0,
      electricityConsumption: body.electricityConsumption || "",
      gasConsumption: body.gasConsumption || "",
      existingLCAs: JSON.stringify(body.existingLCAs) || JSON.stringify([]),
      plannedLCAs: JSON.stringify(body.plannedLCAs) || JSON.stringify([]),
      coffeeQuantity: body.coffeeQuantity || "",
      coffeeOrigin: body.coffeeOrigin || "local",
      coffeeCountry: body.coffeeCountry || "",
      deliveryFrequency: body.deliveryFrequency || "",
      deliveryDistance: body.deliveryDistance || "",
      transportMode: body.transportMode || "road",
      employeeCount: body.employeeCount || "",
      averageCommute: body.averageCommute || "",
      commuteMode: body.commuteMode || "car",
      generalWaste: body.generalWaste || "",
      recyclableWaste: body.recyclableWaste || "",
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: Resource.BUSINESS_TABLE.name,
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
