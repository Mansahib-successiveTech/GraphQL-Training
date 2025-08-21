import { blogModule } from "../modules/blog/index.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
    Query: {
        ...messageModule.Query,
        ...blogModule.Query,
    },
    Mutation: {
        ...messageModule.Mutation,
        ...blogModule.Mutation,
    },
    Subscription: {
        ...messageModule.Subscription,
        ...blogModule.Subscription,
      },
    // Add type resolvers so nested fields work
    User: {
        ...blogModule.User
    },
    Post: {
        ...blogModule.Post
    },
    Comment: {
        ...blogModule.Comment
    },
    QueryResult: {
    __resolveType(obj) {
      if (obj.name && obj.email) {
        return "User";
      }
      if (obj.title && obj.content) {
        return "Post";
      }
      if (obj.text && obj.postId) {
        return "Comment";
      }
      if (obj.code && obj.message) {
        return "Error";
      }
      return null; // GraphQL will throw if it can't resolve
    },

    },
    
};
