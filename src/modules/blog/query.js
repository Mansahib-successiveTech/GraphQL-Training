import { users, posts, comments } from "./dataSource.js";
export const blogResolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.id === args.id),
    posts: () => posts,
    post: (_, args) => posts.find((post) => post.id === args.id),
    comments: () => comments,
    comment: (_, args) => comments.find((comment) => comment.id === args.id),
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
