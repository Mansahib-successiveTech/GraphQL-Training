import { users, posts, comments } from "./dataSource.js";
import jwt from "jsonwebtoken"
export const blogMutationResolvers = {
  updateUser: async (_, { id, name, email }) => {
    
    await new Promise(res => setTimeout(res, 2000)); // simulate delay
    
    const user = users.find((u) => u.id === id);

    if (name) user.name = name;
    if (email) user.email = email;
    return user;
  },

  deleteComment: (_, { id }) => {
    const index = comments.findIndex((c) => c.id === id);
    
    return comments.splice(index, 1)[0];
  },

  addPost: (_, { title, content, authorId }, context) => {
    console.log(context.user);
    if (!context.user) {
      throw new Error("Authentication required");
    }
    const newPost = {
      id: Math.floor(Math.random()*1000+1).toString(),
      title,
      content,
      authorId: context.user.id
    };
    posts.push(newPost);
    return newPost;
  },

  addComment: (_, { text, postId, authorId },{pubsub}) => {
    const newComment = {
      id: Math.floor(Math.random()*1000+1).toString(),
      text,
      postId,
      authorId
    };
    comments.push(newComment);
    pubsub.publish("COMMENT_POSTED", {
      commentPosted: newComment
    });

    return newComment;
  },

   register: (_, { name, email, password }) => {
    const newUser = {
      id: Math.floor(Math.random() * 1000 + 1).toString(),
      name,
      email,
      password,
    };
    users.push(newUser);
    return newUser;
  },
  login: (_, { email, password }, { pubsub }) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");

    // set presence
    user.isOnline = true;

    // publish event for subscriptions
    pubsub.publish("USER_PRESENCE_CHANGED", {
      userPresenceChanged: user,
    });
    const token=jwt.sign({ id: user.id, email: user.email }, "secretkey", {
        expiresIn: "1h",
      })
    return {
      token,
      user,
    };
  },
 logout: (_, __, { pubsub,user }) => {
  console.log(user);
    if (!user) throw new Error("Not authenticated");

    const existingUser = users.find((u) => u.id === user.id);
    if (!existingUser) throw new Error("User not found");

    existingUser.isOnline = false;

    // publish event for subscriptions
    pubsub.publish("USER_PRESENCE_CHANGED", {
      userPresenceChanged: existingUser,
    });

    return { message: "Logged out" };
  },
};
