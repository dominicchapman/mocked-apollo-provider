import { MockedProvider } from "@map/mocked-apollo-provider";
import React from "react";

import { UserList } from "../components/user-list";

export default { title: "User List" };

export const _UserList = () => {
  return (
    <MockedProvider>
      <UserList />
    </MockedProvider>
  );
};
