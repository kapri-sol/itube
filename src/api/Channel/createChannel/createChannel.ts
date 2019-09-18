import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createChannel: async (_, args, { req }) => {
      const user = req.user;
      const { name } = args;
      const channel = await prisma.createChannel({
        name,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return channel;
    }
  }
};
