import { blogMutationResolvers } from "./mutation.js";
import { blogResolvers } from "./query.js";
import { commentSubscriptionResolvers } from "./subscription.js";

export const blogModule = {
  Query: blogResolvers.Query,
  Mutation: blogMutationResolvers,
  Subscription: commentSubscriptionResolvers,
  User: blogResolvers.User,
  Post: blogResolvers.Post,
  Comment: blogResolvers.Comment,
};
