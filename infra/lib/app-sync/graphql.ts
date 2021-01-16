import * as appsync from "@aws-cdk/aws-appsync";
import * as cdk from "@aws-cdk/core";

export class AppSyncGraphQLStack {
  provision(parent: cdk.Stack) {
    const api = new appsync.GraphqlApi(parent, "Api", {
      name: "superformula_test-full-stack",
      schema: appsync.Schema.fromAsset(
        "node_modules/@sf-test/shared/graphql/schema.graphql"
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(parent, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(parent, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(parent, "Stack Region", {
      value: parent.region,
    });

    return api;
  }
}
