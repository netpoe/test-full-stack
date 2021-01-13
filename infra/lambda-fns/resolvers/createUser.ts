import { CreateUserInput } from "../types";

const AWS = require("aws-sdk");
var uuid = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();

export async function createUser(input: CreateUserInput) {
  input.createdAt = new Date().toISOString();
  input.updatedAt = new Date().toISOString();
  input.id = uuid.v4();

  const params = {
    TableName: process.env.USER_TABLE,
    Item: input,
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
