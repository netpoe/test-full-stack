import { GraphQLResult } from "@aws-amplify/api/lib-esm/types/index";
import {
  GetUsersInput,
  Query,
  UsersWithPaginationParams,
} from "@sf-test/shared/graphql/generated/schema";
import { API, graphqlOperation } from "aws-amplify";
import { injectable } from "inversify";
import React from "react";
import "reflect-metadata";
import { getUsersQuery } from "../queries";

type GetUsersQueryResult = Pick<Query, "getUsers">;

@injectable()
export class UserProfilesModel {
  static type = "UserProfilesModel";

  useGetUsersQuery(): {
    execute: (variables: GetUsersInput) => Promise<void>;
    error?: Error;
    data?: UsersWithPaginationParams;
  } {
    const [error, setError] = React.useState<Error>();
    const [data, setData] = React.useState<UsersWithPaginationParams>();

    return {
      execute: async (variables) => {
        try {
          const query = graphqlOperation(getUsersQuery, {
            getUsersInput: variables,
          });

          const { data: result, errors } = (await API.graphql(
            query
          )) as GraphQLResult<GetUsersQueryResult>;

          if (!Boolean(result?.getUsers)) {
            setError(new Error("No data!"));
            return;
          }

          if (errors?.length) {
            setError(errors[0]);
            return;
          }

          setData((result as GetUsersQueryResult).getUsers);
        } catch (error) {
          console.error(error);
          setError(error);
        }
      },
      error,
      data,
    };
  }
}
