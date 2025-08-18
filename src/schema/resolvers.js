import { blogModule } from "../modules/blog/index.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
    Query: {
        ...messageModule.Query,
        ...blogModule.Query,
        user: (_, { id }) => {
            const user = users.find(user => user.id === id);
            if (!user) {
                return { code: 404, message: "User not found" };
            }
            return user;
        }
    },
    Mutation: {
        ...messageModule.Mutation,
        ...blogModule.Mutation,
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
            if (obj.code) {
                return "Error";
            }
            if (obj.name) {
                return "User";
            }
            if (obj.title) {
                return "Post";
            }
            if (obj.text) {
                return "Comment";
            }
            return null;
        }
    }
};
