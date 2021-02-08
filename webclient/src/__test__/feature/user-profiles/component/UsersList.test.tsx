import { UsersWithPaginationParams } from "@sf-test/shared/graphql/generated/schema";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { container } from "../../../../common/context/DependencyContext";
import { UsersList } from "../../../../feature/user-profiles/component";
import { UserProfilesModel } from "../../../../feature/user-profiles/model/UserProfilesModel";

const spy = jest.spyOn(
  container.get<UserProfilesModel>(UserProfilesModel.type),
  "useGetUsersQuery"
);

describe("UsersList", () => {
  test("it should display 'loading' state on first render", () => {
    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: true,
    }));

    render(<UsersList onDisplayCreateUserModal={() => null} onUpdateUserItem={() => null} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("it should render 'Create User' card after loading", () => {
    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: false,
    }));

    render(<UsersList onDisplayCreateUserModal={() => null} onUpdateUserItem={() => null} />);

    expect(screen.getByText("Create a user")).toBeInTheDocument();
  });

  test("there should not be UserCards when no data is available", () => {
    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: false,
    }));

    render(<UsersList onDisplayCreateUserModal={() => null} onUpdateUserItem={() => null} />);

    expect(screen.queryByTestId("user-card-0")).not.toBeInTheDocument();
  });

  test("there should be 1 UserCard ", () => {
    const data: UsersWithPaginationParams = {
      items: [
        {
          id: "1",
          name: "NAME 1",
          dob: "2021-01-01",
          address: "an address",
          description: "a description",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
      ],
    };

    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: false,
      data,
    }));

    render(<UsersList onDisplayCreateUserModal={() => null} onUpdateUserItem={() => null} />);

    expect(screen.queryByTestId("user-card-0")).toBeInTheDocument();
  });
});
