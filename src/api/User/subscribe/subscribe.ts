import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    subscribe: async (_, args, { req }) => {
      const { user } = req;
      const { id } = args;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            subscribes: {
              connect: {
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
