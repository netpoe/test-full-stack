import gql from "graphql-tag";

export const updateUserMutation = gql`
  mutation UpdateUserMutation($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      address
      createdAt
      description
      dob
      id
      name
      updatedAt
    }
  }
`;
