import { CreateUserInput } from "@sf-test/shared/graphql/generated/schema";
import debounce from "lodash/debounce";
import mapboxgl from "mapbox-gl";
import React, { ChangeEvent } from "react";
import DependencyContext from "../../../common/context/DependencyContext";
import { UserProfilesModel } from "../model/UserProfilesModel";

mapboxgl.accessToken = UserProfilesModel.mapbox_access_token;
let map: mapboxgl.Map;

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
};

const Component: React.FC<Props> = ({ children, onCancel, onSuccess }) => {
  const [createUserInput, setCreateUserInput] = React.useState<CreateUserInput>(
    {
      name: "",
      dob: "",
      description: "",
      address: "",
    }
  );

  const container = React.useContext(DependencyContext);
  const userProfilesModel = container.get<UserProfilesModel>(
    UserProfilesModel.type
  );

  const {
    execute: executeCreateUserMutation,
    data: createUserData,
    error: createUserError,
    loading: isCreateUserQueryLoading,
  } = userProfilesModel.useCreateUserMutation();

  const {
    execute: executeSearchLocation,
    data: searchLocationData,
    error: searchLocationError,
    loading: isSearchingLocation,
  } = userProfilesModel.useSearchLocation();

  React.useEffect(() => {
    if (Boolean(map)) {
      return;
    }

    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);

  React.useEffect(() => {
    if (!Boolean(createUserError)) {
      return;
    }

    console.log(createUserError);
  }, [createUserError]);

  React.useEffect(() => {
    if (!Boolean(createUserData)) {
      return;
    }

    onSuccess();
  }, [createUserData]);

  React.useEffect(() => {
    if (!Boolean(searchLocationData)) {
      return;
    }

    const center = searchLocationData?.center;

    map.setCenter(center);

    const marker = new mapboxgl.Marker({
      color: "red",
      draggable: false,
    })
      .setLngLat(center)
      .addTo(map);
  }, [searchLocationData]);

  const onSearchTextChange = (val: string) => {
    onDebounceLocationSearch.current.cancel();
    onDebounceLocationSearch.current(executeSearchLocation, val);
  };

  const onDebounceLocationSearch = React.useRef(
    debounce(
      (search: (variables: { query: string }) => void, searchQuery: string) =>
        search({ query: searchQuery }),
      500
    )
  );

  const onInputValue = (obj: any) => {
    setCreateUserInput({ ...createUserInput, ...obj });
  };

  const onSubmit = () => {
    executeCreateUserMutation(createUserInput);
  };

  return (
    <div id="create-user-card">
      <div className="card">
        <div className="title">
          <h2>Create User</h2>
        </div>
        <div className="map-form row">
          <div className="map-container col-lg-5">
            <div id="map"></div>
          </div>
          <div className="form-container col-lg-7">
            <fieldset>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                disabled={isCreateUserQueryLoading}
                className="form-control"
                value={createUserInput.name}
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
                disabled={isCreateUserQueryLoading}
                className="form-control"
                value={createUserInput.address}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onSearchTextChange(event.currentTarget.value);
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
                disabled={isCreateUserQueryLoading}
                className="form-control"
                value={createUserInput.description}
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
                disabled={isCreateUserQueryLoading}
                className="form-control"
                value={createUserInput.dob}
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
                  disabled={isCreateUserQueryLoading}
                  onClick={onSubmit}
                >
                  CREATE
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

export const CreateUserCard = Component;
