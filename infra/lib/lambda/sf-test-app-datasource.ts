import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";

export class LambdaSFGraphQLDataSource {
  provision(parent: cdk.Stack, api: appsync.GraphqlApi): lambda.Function {
    const layer = new lambda.LayerVersion(parent, "node_dependencies_layer", {
      code: lambda.Code.fromAsset("layer"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
    });

    const lambdaFn = new lambda.Function(
      parent,
      "AppSyncSuperFormulaTestAppHandler",
      {
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "main.handler",
        code: lambda.Code.fromAsset("build/lambda-fns", { exclude: ["*.ts"] }),
        memorySize: 1024,
        layers: [layer],
      }
    );

    const lambdaDataSource = api.addLambdaDataSource(
      "lambdaDatasource",
      lambdaFn
    );

    this.createQueryResolvers(lambdaDataSource);
    this.createMutationResolvers(lambdaDataSource);

    return lambdaFn;
  }

  private createQueryResolvers(ds: appsync.LambdaDataSource) {
    ds.createResolver({
      typeName: "Query",
      fieldName: "getUserByID",
    });

    ds.createResolver({
      typeName: "Query",
      fieldName: "getUsers",
    });
  }

  private createMutationResolvers(ds: appsync.LambdaDataSource) {
    ds.createResolver({
      typeName: "Mutation",
      fieldName: "createUser",
    });

    ds.createResolver({
      typeName: "Mutation",
      fieldName: "updateUser",
    });

    ds.createResolver({
      typeName: "Mutation",
      fieldName: "deleteUser",
    });
  }
}
