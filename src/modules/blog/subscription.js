import { pubsub } from "../../server/pubsub.js";

export const commentSubscriptionResolvers={
    commentPosted: {
        subscribe: () => pubsub.asyncIterableIterator(["COMMENT_POSTED"]),
    },
    userPresenceChanged: {
    subscribe: () => pubsub.asyncIterableIterator(["USER_PRESENCE_CHANGED"]),
  }
}