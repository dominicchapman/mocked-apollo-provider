import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loader } from "graphql.macro";
import React from "react";

const typeDefs = loader("../../../../api/schema.graphql");
const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema });

export const MockedProvider = ({ children }: { children: React.ReactNode }) => {
  const client = React.useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new SchemaLink({ schema: schemaWithMocks }),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
