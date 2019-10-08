import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      return prisma.posts({
        where: {
          OR: [
            { title_starts_with: term },
            { content_starts_with: term },
            {
              user: {
                username_contains: term
              }
            }
          ]
        }
      });
    }
  }
};
