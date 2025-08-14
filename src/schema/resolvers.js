import { blogModule } from "../modules/blog/index.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
    Query: {
        ...messageModule.Query,
        ...blogModule.Query
    },
    Mutation: {
        ...messageModule.Mutation
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
    }
};
