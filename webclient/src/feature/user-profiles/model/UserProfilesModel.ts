import { GraphQLResult } from "@aws-amplify/api/lib-esm/types/index";
import {
  CreateUserInput,
  GetLocationByAddress,
  GetUsersInput,
  Mutation,
  Query,
  UpdateUserInput,
  User,
  UsersWithPaginationParams,
} from "@sf-test/shared/graphql/generated/schema";
import { API, graphqlOperation } from "aws-amplify";
import { injectable } from "inversify";
import { LngLatLike } from "mapbox-gl";
import React from "react";
import "reflect-metadata";
import {
  createUserMutation,
  getLocationByAddressQuery,
  getUsersQuery,
  updateUserMutation,
} from "../queries";

type GetUsersQueryResult = Pick<Query, "getUsers">;
type CreateUserQueryResult = Pick<Mutation, "createUser">;
type UpdateUserQueryResult = Pick<Mutation, "updateUser">;
type GetLocationByAddressQueryResult = Pick<Query, "getLocationByAddress">;
export type MapboxSearchResult = { center: LngLatLike };

@injectable()
export class UserProfilesModel {
  static type = "UserProfilesModel";
  static mapbox_access_token =
    "pk.eyJ1IjoibmV0cG9lIiwiYSI6ImNranlycm10djAwaXQycHBlcTMwdjVkdjkifQ.1JPSk_HC77nEXyjj3lacUQ";

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

  useUpdateUserMutation(): {
    execute: (variables: UpdateUserInput) => Promise<void>;
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

          delete (variables as any).updatedAt;

          const query = graphqlOperation(updateUserMutation, {
            updateUserInput: variables,
          });

          const { data: result, errors } = (await API.graphql(
            query
          )) as GraphQLResult<UpdateUserQueryResult>;

          if (!Boolean(result?.updateUser)) {
            setError(new Error("No data!"));
            return;
          }

          if (errors?.length) {
            setError(errors[0]);
            return;
          }

          setData((result as UpdateUserQueryResult).updateUser);
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

  useSearchLocation(): {
    execute: (address: string) => Promise<void>;
    error?: Error;
    data: GetLocationByAddress & { center: LngLatLike };
    loading: boolean;
  } {
    const [loading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error>();
    const [data, setData] = React.useState<any>();

    return {
      execute: async (address) => {
        try {
          setIsLoading(true);

          const query = graphqlOperation(getLocationByAddressQuery, {
            address,
          });

          const { data: result, errors } = (await API.graphql(
            query
          )) as GraphQLResult<GetLocationByAddressQueryResult>;

          if (!Boolean(result?.getLocationByAddress)) {
            setError(new Error("No data!"));
            return;
          }

          if (errors?.length) {
            setError(errors[0]);
            return;
          }

          setData(
            (result as GetLocationByAddressQueryResult).getLocationByAddress
          );
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
