import { pubsub } from "../../server/pubsub.js";

export const messageSubscriptionResolvers = {
  messagePosted: {
    subscribe: () => pubsub.asyncIterableIterator(["MESSAGE_POSTED"]),
  },
};