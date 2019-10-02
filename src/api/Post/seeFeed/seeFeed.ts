import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, { isImg }, { req }) => {
      const { user } = req;
      const subscribes = await prisma.user({ id: user.id }).subscribes();
      return prisma.posts({
        where: {
          user: {
            id_in: [...subscribes.map(user => user.id)]
          },
          isImg
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
