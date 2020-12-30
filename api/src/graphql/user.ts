import { extendType, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("email");
    t.string("name");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve: async (_root, _args, ctx) => {
        return ctx.db.user.findMany();
      },
    });
  },
});
