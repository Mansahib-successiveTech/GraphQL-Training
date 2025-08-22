import { users, posts, comments } from "./dataSource.js";
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

  addPost: (_, { title, content, authorId }) => {
    const newPost = {
      id: Math.floor(Math.random()*1000+1).toString(),
      title,
      content,
      authorId
    };
    posts.push(newPost);
    return newPost;
  },

  addComment: (_, { text, postId, authorId }) => {
    const newComment = {
      id: Math.floor(Math.random()*1000+1).toString(),
      text,
      postId,
      authorId
    };
    comments.push(newComment);
    return newComment;
  }
};
