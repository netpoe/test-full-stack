import gql from "graphql-tag";

export const createUserMutation = gql`
  mutation CreateUserMutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
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
