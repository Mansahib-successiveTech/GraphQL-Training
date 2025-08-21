import { messageMutationResolvers } from "./mutation.js";
import { messageQueryResolvers } from "./query.js";
import { messageSubscriptionResolvers } from "./subscription.js";
export const messageModule={
    Query:messageQueryResolvers,
    Mutation:messageMutationResolvers,
    Subscription: messageSubscriptionResolvers
}