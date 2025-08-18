import { users, posts, comments } from "./dataSource.js";
export const blogResolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.id === args.id),
    posts: () => posts,
    post: (_, args) => posts.find((post) => post.id === args.id),
    comments: () => comments,
    comment: (_, args) => comments.find((comment) => comment.id === args.id),
    paginatedPosts: (_, { page, limit, sortBy = "id", order = "asc" }) => {
      let sortedPosts = [...posts];

      // Sorting logic
      if (sortBy) {
        sortedPosts.sort((a, b) => {
          if (order === "desc") {
            return b[sortBy] > a[sortBy] ? 1 : -1;
          }
          return a[sortBy] > b[sortBy] ? 1 : -1;
        });
      }

      // Pagination logic
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return sortedPosts.slice(startIndex, endIndex);
    },
  },

  User: {
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
  },

  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
    comments: (parent) =>
      comments.filter((comment) => comment.postId === parent.id),
  },

  Comment: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
    post: (parent) => posts.find((post) => post.id === parent.postId),
  },
};
