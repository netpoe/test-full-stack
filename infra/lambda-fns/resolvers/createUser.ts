import { CreateUserInput } from "@sf-test/shared/graphql/generated/schema";

const AWS = require("aws-sdk");
var uuid = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();

export async function createUser(input: CreateUserInput) {
  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: uuid.v4(),
    },
  };

  try {
    await docClient.put(params).promise();
    return input;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export default createUser;
