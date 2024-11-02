import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";

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

    const ddb = new DynamoDBClient({});
    // process.env.SST_Table_tableName_BusinessTable,
    await ddb.send(
      new PutItemCommand({
        TableName: "greenmev2-green-one-auth-BusinessTable",
        Item: marshall({ ...item }),
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
