import { jest } from "@jest/globals";
import { MapboxOptions } from "mapbox-gl";

class Map {
  constructor(options?: MapboxOptions) {}
  setCenter() {
    return jest.fn();
  }
}

export default {
  Map,
};
