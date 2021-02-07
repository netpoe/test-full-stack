import {
  GetUsersInput,
  UsersWithPaginationParams,
} from "@sf-test/shared/graphql/generated/schema";
import { injectable } from "inversify";
import React from "react";
import "reflect-metadata";

@injectable()
export class UserProfilesModel {
  static type = "UserProfilesModel";

  useGetUsersQuery(): {
    execute: (variables: GetUsersInput) => Promise<void>;
    error?: Error;
    data?: UsersWithPaginationParams;
    loading: boolean;
  } {
    const [loading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error>();
    const [data, setData] = React.useState<UsersWithPaginationParams>();

    return {
      execute: async (variables) => {
        setIsLoading(false);
      },
      error,
      data,
      loading,
    };
  }
}
