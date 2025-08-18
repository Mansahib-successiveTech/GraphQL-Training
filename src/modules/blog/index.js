import { blogMutationResolvers } from "./mutation.js";
import { blogResolvers } from "./query.js";

export const blogModule = {
  Query: blogResolvers.Query,
  Mutation: blogMutationResolvers,
  User: blogResolvers.User,
  Post: blogResolvers.Post,
  Comment: blogResolvers.Comment,
};
