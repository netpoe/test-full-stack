import * as ddb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";

export class DynamoDBUserTable {
  provision(parent: cdk.Stack, lambdaFn: lambda.Function) {
    const table = new ddb.Table(parent, "CDKtable", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    table.grantFullAccess(lambdaFn);

    lambdaFn.addEnvironment("USER_TABLE", table.tableName);
  }
}
