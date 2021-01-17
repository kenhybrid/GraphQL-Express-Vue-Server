import gql from "graphql-tag";

export const ADD_CUSTOMER = gql`
  mutation addCustomer($name: String!, $email: String!, $age: Int!) {
    addCustomer(name: $name, email: $email, age: $age) {
      name
      email
      age
    }
  }
`;
export const EDIT_CUSTOMER = gql`
  mutation editCustomer(
    $id: String!
    $name: String!
    $email: String!
    $age: Int!
  ) {
    editCustomer(id: $id, name: $name, email: $email, age: $age) {
      name
      email
      age
      id
    }
  }
`;

export const All_CUSTOMERS = gql`
  query customers {
    customers {
      name
      email
      age
      id
    }
  }
`;

export const ONE_CUSTOMER = gql`
  query customer($id: String!) {
    customer(id: $id) {
      name
      email
      age
      id
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: String!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`;
