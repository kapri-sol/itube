import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePost: async (_, args) => {
      const { postId } = args;
      return prisma.post({
        id: postId
      });
    }
  }
};
