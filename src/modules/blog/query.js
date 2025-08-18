import { users, posts, comments } from "./dataSource.js";

export const blogResolvers = {
  Query: {
    users: () => {
      if (!users || users.length === 0) {
        return { code: 404, message: "No users found" };
      }
      return users;
    },

    user: (_, { id }) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        return { code: 404, message: `User with id ${id} not found` };
      }
      return user;
    },

    posts: () => {
      if (!posts || posts.length === 0) {
        return { code: 404, message: "No posts found" };
      }
      return posts;
    },

    post: (_, { id }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) {
        return { code: 404, message: `Post with id ${id} not found` };
      }
      return post;
    },

    comments: () => {
      if (!comments || comments.length === 0) {
        return { code: 404, message: "No comments found" };
      }
      return comments;
    },

    comment: (_, { id }) => {
      const comment = comments.find((c) => c.id === id);
      if (!comment) {
        return { code: 404, message: `Comment with id ${id} not found` };
      }
      return comment;
    },

    paginatedPosts: (_, { page, limit, sortBy = "id", order = "asc" }) => {
      if (!posts || posts.length === 0) {
        return { code: 404, message: "No posts available for pagination" };
      }

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
      const sliced = sortedPosts.slice(startIndex, endIndex);

      if (sliced.length === 0) {
        return { code: 404, message: "No posts found for this page" };
      }

      return sliced;
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
