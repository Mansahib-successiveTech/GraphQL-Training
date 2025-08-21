import { Post } from "../../models/postModel.js";
import { User } from "../../models/userModel.js";
import { Comment } from "../../models/commentModel.js";


export const blogResolvers = {
  Query: {
    users: async () => {
      const users = await User.find().populate("posts");
      if (!users.length) return { code: 404, message: "No users found" };
      return users;
    },

    user: async (_, { id }) => {
      const user = await User.findById(id).populate("posts");
      if (!user) return { code: 404, message: `User with id ${id} not found` };
      return user;
    },

    posts: async () => {
      const posts = await Post.find().populate("author").populate("comments");
      if (!posts.length) return { code: 404, message: "No posts found" };
      return posts;
    },

    post: async (_, { id }) => {
      const post = await Post.findById(id)
        .populate("author")
        .populate("comments");
      if (!post) return { code: 404, message: `Post with id ${id} not found` };
      return post;
    },

    comments: async () => {
      const comments = await Comment.find().populate("author").populate("post");
      if (!comments.length) return { code: 404, message: "No comments found" };
      return comments;
    },

    comment: async (_, { id }) => {
      const comment = await Comment.findById(id)
        .populate("author")
        .populate("post");
      if (!comment)
        return { code: 404, message: `Comment with id ${id} not found` };
      return comment;
    },

    paginatedPosts: async (_, { page, limit, sortBy = "createdAt", order = "asc" }) => {
      const sortOrder = order === "desc" ? -1 : 1;

      const posts = await Post.find()
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author")
        .populate("comments");

      if (!posts.length)
        return { code: 404, message: "No posts found for this page" };
      return posts;
    },
  },

  // Nested resolvers are mostly handled by `populate`, but you can keep them:
  User: {
    posts: async (parent) => Post.find({ author: parent._id }),
  },

  Post: {
    author: async (parent) => User.findById(parent.author),
    comments: async (parent) => Comment.find({ post: parent._id }),
  },

  Comment: {
    author: async (parent) => User.findById(parent.author),
    post: async (parent) => Post.findById(parent.post),
  },
};
