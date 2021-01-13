import * as cdk from "@aws-cdk/core";
import { AppSyncGraphQLStack } from "./app-sync";
import { DynamoDBUserTable } from "./dynamo-db";
import { LambdaSFGraphQLDataSource } from "./lambda";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.provision();
  }

  private provision() {
    const api = new AppSyncGraphQLStack().provision(this);
    const lambdaFn = new LambdaSFGraphQLDataSource().provision(this, api);
    new DynamoDBUserTable().provision(this, lambdaFn);
  }
}
