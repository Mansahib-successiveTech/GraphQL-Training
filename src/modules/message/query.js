import { messages } from "./dataSource.js";

export const messageQueryResolvers = {
  messages: () => messages,
  messageHistory: () => {
  // Return all messages sorted by createdAt (newest first)
  return [...messages].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
},
};