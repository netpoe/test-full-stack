/* eslint-disable */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { UsersList } from "../../../../feature/user-profiles/component";
import { container } from "../../../mock/DependencyContext.mock";
import { UserProfilesModel } from "../../../mock/UserProfilesModel.mock";

jest.mock(
  "../../../../common/context/DependencyContext",
  () => require("../../../mock/DependencyContext.mock").default
);

const spy = jest.spyOn(
  container.get<UserProfilesModel>(UserProfilesModel.type),
  "useGetUsersQuery"
);

describe("UsersList", () => {
  afterEach(() => {
    spy.mockClear();
  });

  test("it should display 'loading' state on first render", () => {
    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: true,
    }));

    render(
      <UsersList
        onDisplayCreateUserModal={() => null}
        onUpdateUserItem={() => null}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("it should render 'Create User' card after loading", () => {
    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: false,
    }));

    render(
      <UsersList
        onDisplayCreateUserModal={() => null}
        onUpdateUserItem={() => null}
      />
    );

    expect(screen.getByText("Create a user")).toBeInTheDocument();
  });

  test("there should not be UserCards when no data is available", () => {
    spy.mockImplementation(() => ({
      execute: jest.fn(),
      loading: false,
    }));

    render(
      <UsersList
        onDisplayCreateUserModal={() => null}
        onUpdateUserItem={() => null}
      />
    );

    expect(screen.queryByTestId("user-card-0")).not.toBeInTheDocument();
  });
});
