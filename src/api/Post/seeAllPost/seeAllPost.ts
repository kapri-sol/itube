import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeAllPost: async (_, __, { req }) => {
      const { user } = await req;
      if (user) {
        const subscribes = await prisma.user({ id: user.id }).subscribes();
        return prisma.posts({
          where: {
            user: {
              id_not_in: [...subscribes.map(user => user.id)]
            }
          },
          orderBy: "createdAt_DESC"
        });
      } else {
        return prisma.posts();
      }
    }
  }
};
