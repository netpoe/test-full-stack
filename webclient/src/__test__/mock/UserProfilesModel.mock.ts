import {
  CreateUserInput,
  GetUsersInput,
  User,
  UsersWithPaginationParams,
} from "@sf-test/shared/graphql/generated/schema";
import { injectable } from "inversify";
import "reflect-metadata";
import { MapboxSearchResult } from "../../feature/user-profiles/model/UserProfilesModel";

@injectable()
export class UserProfilesModel {
  static type = "UserProfilesModel";

  useGetUsersQuery(): {
    execute: (variables: GetUsersInput) => Promise<void>;
    error?: Error;
    data?: UsersWithPaginationParams;
    loading: boolean;
  } {
    return {
      execute: jest.fn(),
      loading: false,
    };
  }

  useCreateUserMutation(): {
    execute: (variables: CreateUserInput) => Promise<void>;
    error?: Error;
    data?: User;
    loading: boolean;
  } {
    return {
      execute: jest.fn(),
      loading: false,
    };
  }

  useSearchLocation(): {
    execute: (variables: { query: string }) => Promise<void>;
    error?: Error;
    data?: MapboxSearchResult;
    loading: boolean;
  } {
    return {
      execute: jest.fn(),
      loading: false,
    };
  }
}
