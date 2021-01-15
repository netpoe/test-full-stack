import {
  CreateUserInput,
  GetUsersInput,
  UpdateUserInput
} from "@sf-test/shared/graphql/generated/schema";
import {
  createUser,
  getLocationByAddress,
  getUsers,
  updateUser,
} from "./resolvers";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    createUserInput: CreateUserInput;
    updateUserInput: UpdateUserInput;
    getUsersInput: GetUsersInput;
    address: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "createUser":
      return await createUser(event.arguments.createUserInput);
    case "updateUser":
      return await updateUser(event.arguments.updateUserInput);
    case "getUsers":
      return await getUsers(event.arguments.getUsersInput);
    case "getLocationByAddress":
      return await getLocationByAddress(event.arguments.address);
    default:
      return null;
  }
};
