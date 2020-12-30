import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loader } from "graphql.macro";
import React from "react";

const typeDefs = loader("../../../../api/schema.graphql");
const schema = makeExecutableSchema({ typeDefs });

interface MockedProviderProps {
  mocks?: any;
}

export const MockedProvider: React.FC<MockedProviderProps> = ({
  children,
  mocks,
}) => {
  const client = React.useMemo(() => {
    const withMocks = addMocksToSchema({ schema, mocks });
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new SchemaLink({ schema: withMocks }),
    });
  }, [mocks]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
