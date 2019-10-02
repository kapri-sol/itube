import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { req }) => {
      const { text, postId } = args;
      const { user } = req;
      return prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        },
        text
      });
    }
  }
};
