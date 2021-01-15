const axios = require("axios");

const mapbox_access_token =
  "pk.eyJ1IjoibmV0cG9lIiwiYSI6ImNranlycm10djAwaXQycHBlcTMwdjVkdjkifQ.1JPSk_HC77nEXyjj3lacUQ";

export async function getLocationByAddress(address: string) {
  const response = {
    center: [],
  };

  try {
    const axiosResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`,
      {
        params: {
          access_token: mapbox_access_token,
        },
        timeout: 10000,
      }
    );

    if (!Boolean(axiosResponse?.data)) {
      throw new Error("No data!");
    }

    response["center"] = axiosResponse.data.features[0].center;
  } catch (err) {
    console.log("getLocationByAddress error: ", err);
  }

  return response;
}

export default getLocationByAddress;
