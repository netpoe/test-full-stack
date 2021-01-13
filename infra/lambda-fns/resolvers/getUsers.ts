import { GetUsersInput } from "../types";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Limit: string | undefined;
  ExclusiveStartKey?: { item_id: string | undefined };
};

export async function getUsers({ pageSize, exclusiveStartKey }: GetUsersInput) {
  const params: Params = {
    TableName: process.env.USER_TABLE,
    Limit: pageSize,
  };

  if (Boolean(exclusiveStartKey)) {
    params.ExclusiveStartKey = { item_id: exclusiveStartKey };
  }

  try {
    const response = await docClient.scan(params).promise();

    return {
      items: response.Items,
      exclusiveStartKey: response.LastEvaluatedKey,
    };
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export default getUsers;
