import { createUser } from "./resolvers";
import { CreateUserInput } from "./types";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    createUserInput: CreateUserInput;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "createUser":
      return await createUser(event.arguments.createUserInput);
    default:
      return null;
  }
};
