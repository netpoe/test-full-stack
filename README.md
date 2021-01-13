# Superformula Fullstack Test

## Deploying the app infrastructure

The AWS resources are managed by AWS CDK `--typescript`.

Edit the `infra/lib/infra-stack.ts` file to extend the resources.

To deploy a new stack, first ensure that you've run:

```
aws configure
```

in your CLI. This should ask for the AWS region, and access keys, which should be availble in your [AWS secrets dashboard](https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials).

Then install the necessary npm packages:

```
npm
```

You can list the resources to be created with the following command:

```
npm run build && cdk diff
```

For this application, the resources include:

```
Resources
[+] AWS::IAM::Role Api/lambdaDatasource/ServiceRole ApilambdaDatasourceServiceRole2CA75790
[+] AWS::IAM::Policy Api/lambdaDatasource/ServiceRole/DefaultPolicy ApilambdaDatasourceServiceRoleDefaultPolicy3A97E34D
[+] AWS::AppSync::DataSource Api/lambdaDatasource ApilambdaDatasource2C776EE2
[+] AWS::AppSync::Resolver Api/QuerygetUserByIDResolver ApiQuerygetUserByIDResolver5BFD1897
[+] AWS::AppSync::Resolver Api/QuerygetUsersResolver ApiQuerygetUsersResolver0F137ECE
[+] AWS::AppSync::Resolver Api/MutationcreateUserResolver ApiMutationcreateUserResolver1A5C22BA
[+] AWS::AppSync::Resolver Api/MutationupdateUserResolver ApiMutationupdateUserResolverC1D8B7A0
[+] AWS::AppSync::Resolver Api/MutationdeleteUserResolver ApiMutationdeleteUserResolver08C44CED
[+] AWS::IAM::Role AppSyncSuperFormulaTestAppHandler/ServiceRole AppSyncSuperFormulaTestAppHandlerServiceRoleBEE6B93E
[+] AWS::IAM::Policy AppSyncSuperFormulaTestAppHandler/ServiceRole/DefaultPolicy AppSyncSuperFormulaTestAppHandlerServiceRoleDefaultPolicyFBBAD55D
[+] AWS::Lambda::Function AppSyncSuperFormulaTestAppHandler AppSyncSuperFormulaTestAppHandlerCE88CA30
[+] AWS::DynamoDB::Table CDKtable CDKtable65677265
[~] AWS::AppSync::ApiKey Api/DefaultApiKey ApiDefaultApiKeyF991C37B
 └─ [~] Expires
     ├─ [-] 1642027514
     └─ [+] 1642030656
```

> #### A note before deploying successfully.
>
> You may find an error with the following output while running `npm run build && cdk deploy`: `❌ InfraStack failed: Error: This stack uses assets, so the toolkit stack must be deployed to the environment (Run "cdk bootstrap aws://unknown-account/unknown-region")`
>
> This is because the Lambda functions need to be stored somewhere, in this case, AWS S3.
>
> To solve this problem, simply run `cdk bootstrap`. You should get the following output: `✅ Environment aws://ACCOUNT_ID/REGION bootstrapped.`

Lastly, run the following command to build and deploy the stack:

```
npm run build && cdk deploy
```

You should see the following CLI output upon success:

```
> infra@0.1.0 build /Users/~/infra
> tsc

InfraStack: deploying...
InfraStack: creating CloudFormation changeset...
[██████████████████████████████████████████████████████████] (5/5)

 ✅  InfraStack

Outputs:
InfraStack.GraphQLAPIKey = da2-...
InfraStack.GraphQLAPIURL = https://KEY.appsync-api.us-west-2.amazonaws.com/graphql
InfraStack.StackRegion = us-west-2

Stack ARN:
arn:aws:cloudformation:us-west-2:342433597948:stack/InfraStack/HIDDEN
```

and the resource should be available in the AppSync AWS console. 🎉
