import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, args, { req }) => {
      const { id, title, content } = args;
      const { user } = req;

      const isExist = await prisma.$exists.post({ id, user });
      if (isExist) {
        const Post = await prisma.updatePost({
          where: { id },
          data: { title, content }
        });
        return Post;
      } else {
        return null;
      }
    }
  }
};
