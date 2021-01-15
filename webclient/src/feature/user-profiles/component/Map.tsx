import debounce from "lodash/debounce";
import mapboxgl from "mapbox-gl";
import React from "react";
import DependencyContext from "../../../common/context/DependencyContext";
import { UserProfilesModel } from "../model/UserProfilesModel";

mapboxgl.accessToken = UserProfilesModel.mapbox_access_token;
let map: mapboxgl.Map;

type Props = {};

export type MapComponentReferenceProps = {
  onSearchTextChange: (val: string) => void;
};

const Component: React.ForwardRefRenderFunction<
  MapComponentReferenceProps,
  Props
> = ({ children }, ref) => {
  const container = React.useContext(DependencyContext);
  const userProfilesModel = container.get<UserProfilesModel>(
    UserProfilesModel.type
  );

  const {
    execute: executeSearchLocation,
    data: searchLocationData,
    error: searchLocationError,
    loading: isSearchingLocation,
  } = userProfilesModel.useSearchLocation();

  React.useEffect(() => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);

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

  React.useImperativeHandle(ref, () => ({
    onSearchTextChange,
  }));

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

  return <div id="map"></div>;
};

export const Map = React.forwardRef(Component);
