import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unsubscribe: async (_, args, { req }) => {
      const { id } = args;
      const { user } = req;
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
