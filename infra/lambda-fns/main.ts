import {
  CreateUserInput,
  GetUsersInput,
  UpdateUserInput,
} from "@sf-test/shared/graphql/generated/schema";
import { createUser, getUsers, updateUser } from "./resolvers";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    createUserInput: CreateUserInput;
    updateUserInput: UpdateUserInput;
    getUsersInput: GetUsersInput;
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
    default:
      return null;
  }
};
