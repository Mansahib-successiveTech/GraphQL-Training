import { messages } from "./dataSource.js";

export const messageQueryResolvers = {
  messages: () => messages,
};