import gql from "graphql-tag";

export const getUsersQuery = gql`
  query GetUsersQuery($getUsersInput: GetUsersInput!) {
    getUsers(getUsersInput: $getUsersInput) {
      exclusiveStartKey
      items {
        address
        createdAt
        description
        dob
        id
        name
        updatedAt
      }
    }
  }
`;
