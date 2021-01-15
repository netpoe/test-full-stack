import gql from "graphql-tag";

export const getLocationByAddressQuery = gql`
  query GetLocationByAddressQuery($address: String!) {
    getLocationByAddress(address: $address) {
      center
    }
  }
`;
