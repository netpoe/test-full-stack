import { createUser, getUsers } from "./resolvers";
import { CreateUserInput, GetUsersInput } from "./types";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    createUserInput: CreateUserInput;
    getUsersInput: GetUsersInput;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "createUser":
      return await createUser(event.arguments.createUserInput);
    case "getUsers":
      return await getUsers(event.arguments.getUsersInput);
    default:
      return null;
  }
};
