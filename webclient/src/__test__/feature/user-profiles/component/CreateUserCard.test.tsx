import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { container } from "../../../../common/context/DependencyContext";
import { UserProfiles } from "../../../../feature/user-profiles/screen";
import { UserProfilesModel } from "../../../mock/UserProfilesModel.mock";

jest.mock("../../../../feature/user-profiles/model/UserProfilesModel", () =>
  require("../../../mock/UserProfilesModel.mock")
);

jest.mock("mapbox-gl", () => require("../../../mock/Mapbox.mock").default);

describe("CreateUserCard", () => {
  test("click to create new user and open the CreateUserCard modal", () => {
    render(<UserProfiles />);

    userEvent.click(screen.getByTestId("create-new-user-button"));

    expect(screen.getByTestId("create-user-card")).toBeInTheDocument();
  });

  test("should execute the create user mutation", () => {
    render(<UserProfiles />);

    const name = "A Name";

    jest
      .spyOn(container.get<UserProfilesModel>(UserProfilesModel.type), "useCreateUserMutation")
      .mockImplementation(() => ({
        execute: async (vars) => {
          expect(vars.name).toEqual(name);
        },
        loading: false,
      }));

    userEvent.click(screen.getByTestId("create-new-user-button"));
    userEvent.type(screen.getByTestId("create-user-card-name-input"), name);
    userEvent.click(screen.getByTestId("create-user-card-on-submit-button"));
  });
});
