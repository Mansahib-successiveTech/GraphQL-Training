import { messageMutationResolvers } from "./mutation.js";
import { messageQueryResolvers } from "./query.js";
export const messageModule={
    Query:messageQueryResolvers,
    Mutation:messageMutationResolvers
}