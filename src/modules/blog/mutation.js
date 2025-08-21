import jwt from "jsonwebtoken";
import { Post } from "../../models/postModel.js";
import { User } from "../../models/userModel.js";
import { Comment } from "../../models/commentModel.js";


export const blogMutationResolvers = {
  // Update user details
  updateUser: async (_, { id, name, email }) => {
    await new Promise((res) => setTimeout(res, 2000)); // simulate delay

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, email } },
      { new: true } // return updated doc
    );

    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }

    return updatedUser;
  },

  //  Delete comment
  deleteComment: async (_, { id }) => {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return deletedComment;
  },

  // Add new post (requires auth)
  addPost: async (_, { title, content }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }
    const finduser = await User.findById(context.user.id);
    
    if (finduser.role !== "admin") {
      throw new Error("Only admins can add posts");
    }
    const newPost = new Post({
      title,
      content,
      author: context.user.id,
    });

    await newPost.save();
    return newPost;
  },

  //  Add comment (with pubsub)
  addComment: async (_, { text, postId }, { pubsub, user }) => {
    if (!user) throw new Error("Authentication required");

    const post = await Post.findById(postId);
    if (!post) throw new Error(`Post with id ${postId} not found`);

    const newComment = new Comment({
      text,
      post: postId,
      author: user.id,
    });

    await newComment.save();

    pubsub.publish("COMMENT_POSTED", {
      commentPosted: newComment,
    });

    return newComment;
  },

  // Register new user
  register: async (_, { name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already registered");

    const newUser = new User({
      name,
      email,
      password, 
    });

    await newUser.save();
    return newUser;
  },

  //  Login user + JWT
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email, password }); 
    if (!user) throw new Error("Invalid credentials");

    return jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "3h" }
    );
  },
};
