import { GraphQLResult } from "@aws-amplify/api/lib-esm/types/index";
import {
  CreateUserInput,
  GetUsersInput,
  Mutation,
  Query,
  User,
  UsersWithPaginationParams,
} from "@sf-test/shared/graphql/generated/schema";
import { API, graphqlOperation } from "aws-amplify";
import { injectable } from "inversify";
import React from "react";
import "reflect-metadata";
import { createUserMutation, getUsersQuery } from "../queries";

type GetUsersQueryResult = Pick<Query, "getUsers">;
type CreateUserQueryResult = Pick<Mutation, "createUser">;

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

        setIsLoading(false);
      },
      error,
      data,
      loading,
    };
  }

  useCreateUserMutation(): {
    execute: (variables: CreateUserInput) => Promise<void>;
    error?: Error;
    data?: User;
    loading: boolean;
  } {
    const [loading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error>();
    const [data, setData] = React.useState<User>();

    return {
      execute: async (variables) => {
        try {
          setIsLoading(true);

          const query = graphqlOperation(createUserMutation, {
            createUserInput: variables,
          });

          const { data: result, errors } = (await API.graphql(
            query
          )) as GraphQLResult<CreateUserQueryResult>;

          if (!Boolean(result?.createUser)) {
            setError(new Error("No data!"));
            return;
          }

          if (errors?.length) {
            setError(errors[0]);
            return;
          }

          setData((result as CreateUserQueryResult).createUser);
        } catch (error) {
          console.error(error);
          setError(error);
        }

        setIsLoading(false);
      },
      error,
      data,
      loading,
    };
  }
}
