import event from "./event/createUser.json";
import createUserMock from "./mock/createUser.mock";
const main = require("../lambda-fns/main");
const aws = require("aws-sdk");

jest.mock("aws-sdk", () => ({
  DynamoDB: {
    DocumentClient: jest.fn(),
  },
}));

describe("test createUser", () => {
  beforeEach(() => {
    aws.DynamoDB.DocumentClient.mockClear();
  });

  test("success: returns User item", async () => {
    aws.DynamoDB.DocumentClient.mockImplementation(
      () => createUserMock.success
    );

    const result = await main.handler(event);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(event.arguments.createUserInput.name);
    expect(result.address).toEqual(event.arguments.createUserInput.address);
    expect(result.description).toEqual(
      event.arguments.createUserInput.description
    );
    expect(result.dob).toEqual(event.arguments.createUserInput.dob);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();

    expect(aws.DynamoDB.DocumentClient).toHaveBeenCalledTimes(1);
  });

  test("error: put method failure should return null", async () => {
    aws.DynamoDB.DocumentClient.mockImplementation(
      () => createUserMock.failure
    );

    const result = await main.handler(event);

    expect(result).toBe(null);
    expect(aws.DynamoDB.DocumentClient).toHaveBeenCalledTimes(1);
  });
});
