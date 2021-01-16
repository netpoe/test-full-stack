import { GetUsersInput } from "@sf-test/shared/graphql/generated/schema";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Limit: string | undefined;
  ExclusiveStartKey?: { id: string | undefined };
};

export async function getUsers({ pageSize, exclusiveStartKey }: GetUsersInput) {
  const params: Params = {
    TableName: process.env.USER_TABLE,
    Limit: pageSize.toString(),
  };

  if (Boolean(exclusiveStartKey)) {
    const [, id] = /{id=(.*)}/gi.exec(
      exclusiveStartKey as string
    ) as RegExpExecArray;
    params.ExclusiveStartKey = { id };
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
