import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unsubscribe: async (_, args, { req }) => {
      const { postId } = args;
      const { user } = req;
      const { id } = await prisma.post({ id: postId }).user();
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            subscribes: {
              disconnect: {
                id
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
