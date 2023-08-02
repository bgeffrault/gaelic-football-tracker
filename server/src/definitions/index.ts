import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as Books, resolvers as ResolverBooks } from "./books.js";

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([Books]),
  resolvers: mergeResolvers([ResolverBooks]),
});
