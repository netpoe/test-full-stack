import { UpdateUserInput, User } from "@sf-test/shared/graphql/generated/schema";
import React, { ChangeEvent } from "react";
import DependencyContext from "../../../common/context/DependencyContext";
import { UserProfilesModel } from "../model/UserProfilesModel";
import { Map, MapComponentReferenceProps } from "./Map";

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
  user: User;
};

const Component: React.FC<Props> = ({ children, onCancel, onSuccess, user }) => {
  const [updateUserInput, setUpdateUserInput] = React.useState<UpdateUserInput>(user);
  const mapRef = React.createRef<MapComponentReferenceProps>();

  const container = React.useContext(DependencyContext);
  const userProfilesModel = container.get<UserProfilesModel>(UserProfilesModel.type);

  const {
    execute: executeUpdateUserMutation,
    data: updateUserData,
    error: updateUserError,
    loading: isUpdateUserQueryLoading,
  } = userProfilesModel.useUpdateUserMutation();

  React.useEffect(() => {
    if (!Boolean(updateUserInput?.address)) {
      return;
    }

    mapRef.current?.onSearchTextChange(updateUserInput?.address);
  }, []);

  React.useEffect(() => {
    if (!Boolean(updateUserError)) {
      return;
    }

    console.log(updateUserError);
  }, [updateUserError]);

  React.useEffect(() => {
    if (!Boolean(updateUserData)) {
      return;
    }

    onSuccess();
  }, [updateUserData]);

  const onInputValue = (obj: any) => {
    setUpdateUserInput({ ...updateUserInput, ...obj });
  };

  const onSubmit = () => {
    executeUpdateUserMutation(updateUserInput);
  };

  return (
    <div id="create-user-modal">
      <div className="card">
        <div className="title">
          <h2>Edit User</h2>
        </div>
        <div className="map-form row">
          <div className="map-container col-lg-5">
            <Map ref={mapRef} />
          </div>
          <div className="form-container col-lg-7">
            <fieldset>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                disabled={isUpdateUserQueryLoading}
                className="form-control"
                value={updateUserInput.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onInputValue({
                    name: event.currentTarget.value,
                  });
                }}
              />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                disabled={isUpdateUserQueryLoading}
                className="form-control"
                value={updateUserInput.address}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  mapRef.current?.onSearchTextChange(event.currentTarget.value);
                  onInputValue({
                    address: event.currentTarget.value,
                  });
                }}
              />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                disabled={isUpdateUserQueryLoading}
                className="form-control"
                value={updateUserInput.description}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onInputValue({
                    description: event.currentTarget.value,
                  });
                }}
              />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="text"
                disabled={isUpdateUserQueryLoading}
                className="form-control"
                value={updateUserInput.dob}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onInputValue({
                    dob: event.currentTarget.value,
                  });
                }}
              />
            </fieldset>
            <div className="actions row">
              <div className="action col-lg">
                <button
                  className="btn btn-light btn-lg full-width"
                  disabled={isUpdateUserQueryLoading}
                  onClick={onSubmit}
                >
                  SAVE
                </button>
              </div>
              <div className="action col-lg">
                <button
                  className="btn btn-outline-secondary  btn-lg full-width"
                  onClick={onCancel}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UpdateUserCard = Component;
