import React from "react";
import { gql, useQuery } from "@map/mocked-apollo-provider";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
    }
  }
`;

export const UserList: React.FC = () => {
  const { data, error, loading } = useQuery(GET_USERS);

  return (
    <>
      <b>Data: </b>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <b>Error: </b>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <b>Loading: </b>
      <pre>{JSON.stringify(loading, null, 2)}</pre>
    </>
  );
};
