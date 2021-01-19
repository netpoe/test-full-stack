import { CreateUserInput } from "@sf-test/shared/graphql/generated/schema";

const AWS = require("aws-sdk");
var uuid = require("uuid");

export async function createUser(input: CreateUserInput) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const Item = {
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuid.v4(),
  };

  const params = {
    TableName: process.env.USER_TABLE,
    Item,
  };

  try {
    await docClient.put(params).promise();
    return Item;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export default createUser;
