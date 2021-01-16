# Superformula Full Stack Developer Test Proposal

Candidate: Gustavo Ibarra
Applying for: Sr. Software Architect & Fullstack Developer
Github Username: netpoe
Timezone: GMT -6 America/Guatemala
Start Date: Tue Jan 12th, 2021
Estimated Delivery Date: Fri Jan 15th, 2021, 5PM America/LosAngeles

## Summary

This pull-request represents a web application code proposal that meets most of the requirements as described in the original _Superformula Full Stack Developer Test_ README.

Both the Backend Context and the UI Context guidelines were considered during the development of this proposal. Please follow through this document to learn about the time invested, chosen libraries & languages, architectural decisions and how to install & run the application.

[Working Online Demo](https://superformula-fe381.web.app/) (mapbox requests may be limited).

### Time spent

According to my time tracker, I spent _16 hrs 24 mins over the Last 7 Days in test-app under all branches._

Figure 1-0 displays the languages used in the project:

<img width="1168" alt="Screen Shot 2021-01-15 at 18 08 22" src="https://user-images.githubusercontent.com/4053518/104817395-a4911c00-57e6-11eb-97fa-508a2cfd864e.png">

### Installation

First clone this repository:

```
git clone git@github.com:netpoe/test-full-stack.git
cd test-full-stack
```

Some global packages are shared between contexts. Namely `rimraf` and `typescript`.

Install them with:

```
yarn global add rimraf typescript
```

#### Shared Context

The UI Context communicates with AWS Lambda using GraphQL queries. To avoid code duplication, the `schema.graphql` containing the Queries and Mutations is stored in the root `shared` directory.

To install the shared libraries in the `infra` and `webclient` directories, run these commands in your CLI:

```
cd shared
yarn
cd build
yarn link
```

This should compile the `shared` libraries and create a symbolic link `@sf-test/shared` that will be used in `infra` and `webclient`.

#### Backend Context

The AWS resources are managed by AWS CDK `--typescript`.

> Make sure that you have an active AWS account with Admin permissions before continuing.

Edit the `infra/lib/infra-stack.ts` file to extend the resources.

To deploy a new stack, first ensure that you've run:

```
aws configure
```

in your CLI. This should ask for the AWS region, and access keys, which should be available in your [AWS secrets dashboard](https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials).

Then install the necessary npm packages:

```
cd infra
yarn
yarn link @sf-tet/shared
```

##### Bundling the Lambda modules before deploying

This project uses Lambda Layers to bundle the npm packages used in some AWS lambda functions.

Install these modules by executing:

```
cd infra/layer/nodejs
yarn
```

##### Deploying the infrastructure

You can list the resources to be created with the following command:

```
yarn build && cdk diff
```

> #### A note before deploying successfully.
>
> You may find an error with the following output while running `yarn build && cdk deploy`: `❌ InfraStack failed: Error: This stack uses assets, so the toolkit stack must be deployed to the environment (Run "cdk bootstrap aws://unknown-account/unknown-region")`
>
> This is because the Lambda functions needs to be stored somewhere, in this case, AWS S3.
>
> To solve this problem, simply run `cdk bootstrap`. You should get the following output: `✅ Environment aws://ACCOUNT_ID/REGION bootstrapped.`

Lastly, run the following command to build and deploy the stack:

```
yarn build && cdk deploy
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

#### UI Context

To build and run the `webclient` project, follow these steps:

```
cd webclient
yarn
yarn link @sf-test/shared

yarn start
```

This should open your default browser window and display the `UsersProfile` screen component in `localhost:3000`.

---

# Superformula Full Stack Developer Test

Be sure to read **all** of this document carefully, and follow the guidelines within.

## Backend Context

Build a GraphQL API that can `create/read/update` user data from a persistence store. Delete functionality is not required.

### User Model

```
{
  "id": "xxx",                  // user ID (must be unique)
  "name": "backend test",       // user name
  "dob": "",                    // date of birth
  "address": "",                // user address
  "description": "",            // user description
  "createdAt": ""               // user created date
  "updatedAt": ""               // user updated date
}
```

### Functionality

- The API should follow typical GraphQL API design pattern
  > The main GraphQL `schema.grapqhl` file is located here: [schema.graphql](https://github.com/netpoe/test-full-stack/blob/master/shared/graphql/schema.graphql).
- The data should be saved in the DB
  > [DynamoDB is provisioned with AWS CDK here](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/dynamo-db/user-table.ts).
- Proper error handling should be used
  > All AWS lambdas are logging errors to Cloudwatch.
- Paginating and filtering (by name) users list
  > This is only implemented client-side. [Please refer to this commit](https://github.com/netpoe/test-full-stack/commit/26dbf91a0a123450267910cee8e14706713fd62a) to see a "pattern" of how I would create the endpoint `searchUsers(query: SearchUsersQueryInput): [User]`.

### Basic Requirements

- Use **AWS AppSync (preferred)** or AWS Lambda + API Gateway approach
  > The AWS lambda functions are provisioned with AppSync. The client uses `aws-amplify` to make requests to the AppSync endpoint. Refer to these files for the implementation: [AppSync provisioning](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/app-sync/graphql.ts), [Connecting graphql resolvers to lambda](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/lambda/sf-test-app-datasource.ts)
- Use any AWS Database-as-a-Service persistence store. DynamoDB is preferred.
  > [A `USER` table is provisioned with DynamoDb AWS CDK](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/dynamo-db/user-table.ts)
- Write concise and clear commit messages
  > [Refer to the commits history](https://github.com/netpoe/test-full-stack/commits/master). I worked with the `master` branch for this project. But normally I'd choose concise branch names according to the feature in question. In enterprise software, I'd normally work with 3 major branches: `master`, `staging` and `production`. Any pull-request to `master` will trigger automatic CI/CD tests. `master` is protected if tests fail. Pull-requests from `master` to `staging` will trigger a test environment pipeline which deploys a copy of production with dummy data in a test subdomain for QA. PRs to `production` deploy the final production code.
- Write clear **documentation** on how it has been designed and how to run the code
- Add a Query to fetch location information based off the user's address (use [NASA](https://api.nasa.gov/api.html) or [Mapbox](https://www.mapbox.com/api-documentation/) APIs); use AWS Lambda
  > [I worked on this](https://github.com/netpoe/test-full-stack/commit/26dbf91a0a123450267910cee8e14706713fd62a) but I was getting some `timeout`s with the HTTP requests. So I decided to `git revert` to a [previous working version of the Mapbox API](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/model/UserProfilesModel.ts#L175-L216). This React hook is reused in the `CreateUserCard` and the `UpdateUserCard` through the [`Map`](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/Map.tsx#L25-L30) component.Queries to Mapbox are throttled by 500 ms to send more consistent queries.

### Bonus (in order)

1. Use Infrastructure-as-code tooling that can be used to deploy all resources to an AWS account. Examples: CloudFormation / SAM, Terraform, Serverless Framework, etc.
   > I went for AWS CDK using the Javascript SDKs with Typescript. [The infrastructure is provisioned here and I modularized each stack](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/infra-stack.ts#L6-L18) to allow for scalability.
1. Provide proper unit tests
   > I didn't write Unit tests for this project. But I'd normally go with Jest if the project is in JS/TS. To test the lambda functions, I'd create mock events in JSON files for each function arguments. I'd also mock any remote request, such as an HTTP call to an API (for example the mapbox `GET` request).
1. Providing an online demo is welcomed, but not required
1. Delete user functionality
   > Not implemented, but [the `schema.graphl` considers it.](https://github.com/netpoe/test-full-stack/blob/master/shared/graphql/schema.graphql#L9)
1. Bundle npm modules into your Lambdas
   > I used the [lambda `LayerVersion` class](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/lambda/sf-test-app-datasource.ts#L7-L10) to bundle the npm modules needed for some GraphQL endpoint. For example, [the `uuid` module is used in the `createUser` resolver](https://github.com/netpoe/test-full-stack/blob/master/infra/lambda-fns/resolvers/createUser.ts#L4) and is [bundled here](https://github.com/netpoe/test-full-stack/blob/master/infra/layer/nodejs/package.json#L12).

### Advanced Requirements

These may be used for further challenges. You can freely skip these; feel free to try out if you feel up to it.

- Describe your strategy for Lambda error handling, retries, and DLQs
  > I'm only logging to Cloudwatch. I didn't implement retries or DLQs but the [aws-sns](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-sns-readme.html#dlq-setup-for-sns-subscription) CDK module would provide functionality for this.
- Describe your cloud-native logging, monitoring, and alarming strategy across all queries/mutations
  > Cloudwatch is set for the Lambda functions. I didn't implement complex log filtering or error handling. The `webclient` does handles errors upon each GraphQL call. [Errors are set in the state](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/model/UserProfilesModel.ts#L60-L69) and [handled by `useEffect` hooks inside the components](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/CreateUserCard.tsx#L32-L45).

## UI context

Use HTML, CSS, and JavaScript (choose one of popular framework) to implement the following mock-up. You are only required to complete the desktop views, unless otherwise instructed. Application should connect to created GraphQL API.

## Requirements

### Functionality

- The search functionality should perform real time filtering on client side data and API side data
  > [Real time filtering is only implemented client-side](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/screen/UserProfiles.tsx#L75-L83). Something cool is that the input uses a reference of `UsersList` [to call the `search` function](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/UsersList.tsx#L67-L81).
- List of users should be updated automatically after single user is updated
  > [Done](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/screen/UserProfiles.tsx#L32-L40).
- Create modal from scratch - please don't use any library for it
  > [I created it from scratch with pure `scss`](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/index.scss#L63-L78). I didn't add animations though.
- Appear/Disappear of modal should be animated (feel free with choose how)
  > Not implemented
- Infinite loading state should be saved in url query (pagination state should be present in URL query (eg ?page=1) to allow for behavior where the user can reload the page while still returning to their current scroll position)
  > Done. The "LOAD MORE" button should query more results. This query has an optimization because I'm querying the results [using DynamoDB's `ExclusiveStartKey`](https://github.com/netpoe/test-full-stack/blob/master/infra/lambda-fns/resolvers/getUsers.ts#L18-L23). The "LOAD MORE" function passes this value to [fetch only the pending items](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/UsersList.tsx#L50-L65) and not the entire list again. The `pageSize` URL search param is set to provide pagination functionality.

### Tech stack

- JS oriented (Typescript preferred)
  > Done. Built using typescript.
- Use **React**, **Angular** or **VUE** (React preferred)
  > I chose React with `create-react-app --typescript`.
- Use unsplash.com to show random avatar images
  > [Done.](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/ProfilePicture.tsx#L28-L47)
- You don't have to write configuration from scratch (you can use eg. CRA for React application)
  > Done
- Feel free to use a preprocessor like SASS/SCSS/Less or CSS in JS
  > Chose SCSS.
- Provide E2E and unit tests (one component&view well tested is enough, no need to test every component/view)
  > I didn't wrote tests, but I'd write E2E tests with Cypress (or even Google puppetteer is really cool and efficient).
- Please **do not** use any additional libraries with predefined styles like `react-bootstrap`, `material-ui` etc.
  > I didn't use any libraries. But I did import a `grid`, `form` and `buttons` mixins to my `scss` main file. Creating a grid, inputs and buttons from scratch was taking me too much time.

### Bonus (in order)

1. Write clear **documentation** on how the app was designed and how to run the code
1. Providing an online demo is welcomed, but not required.
1. Provide a description of how you approach mobile friendly apps (what do you use, how)
   > I debug my responsive web apps with the Chrome devtools responsive tool. I use a CSS grid library for this.
1. Write concise and clear commit messages.
1. Provide components in [Storybook](https://storybook.js.org) with tests.
1. Include subtle animations to focus attention
1. Describe optimization opportunities when you conclude
1. Map with user location should update async - when user changes "location" field (feel free to choose MAPS service e.g. GoogleMaps, OpenStreetMap)
   > Done.
1. Handle server errors
1. Handle loading states
   > [Done.](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/UsersList.tsx#L155-L157)
1. Delete user functionality
   > Not implemented.

## What We Care About

Use any libraries that you would normally use if this were a real production App. Please note: we're interested in your code & the way you solve the problem, not how well you can use a particular library or feature.

_We're interested in your method and how you approach the problem just as much as we're interested in the end result._

Here's what you should strive for:

- Good use of current HTML, CSS, JavaScript, Node.js & performance best practices.
  > Most of the `infra` and `webclient` are modularised so that new developers could join the codebase and follow a concise development workflow. Naming and structure was chose carefully (yet quick).
- Solid testing approach.
  > I didn't write tests. But please look at this repo. [I've rote tests for a complex backend before](https://github.com/ibexmercado/crypto-mercado/tree/master/graphqlserver/src/__tests__/features).
- Extensible code.
  > I made some architectural decisions to allow for understandability and a modular structure. In the `infra` project, [I moved each relevant Stack to its own `class`](https://github.com/netpoe/test-full-stack/blob/master/infra/lib/infra-stack.ts#L13-L16). I chose the name `provision` to execute the deployments.
  > In the `webclient` project, [I created a `DependencyContext` to inject dependencies in any component](https://github.com/netpoe/test-full-stack/blob/master/webclient/src/feature/user-profiles/component/UsersList.tsx#L36-L46). This will allow the project to scale and to reduce verbosity in the function components body. This also centralizes business logic, such as calling the GraphQL endpoints.
