import { ApolloServer } from "apollo-server";
import chalk from "chalk";

import { context } from "./context";
import { schema } from "./schema";

export const server = new ApolloServer({ context, schema });

server.listen().then(({ url }) => {
  console.log(chalk.green(`● server available at ${url}`));
});
