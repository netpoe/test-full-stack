import { UpdateUserInput } from "@sf-test/shared/graphql/generated/schema";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};

export async function updateUser(
  input: UpdateUserInput & { [key: string]: any }
) {
  const params: Params = {
    TableName: process.env.USER_TABLE,
    Key: {
      id: input.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };

  input.updatedAt = new Date().toISOString();

  let prefix = "set ";
  const attributes = Object.keys(input);

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    if (attribute !== "id") {
      params["UpdateExpression"] +=
        prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = input[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }

  try {
    await docClient.update(params).promise();
    return input;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export default updateUser;
