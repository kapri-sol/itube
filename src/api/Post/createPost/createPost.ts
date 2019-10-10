import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createPost: async (_, args, { req }) => {
      const { user } = req;
      const { title, content, fileId } = await args;
      try {
        const File = await prisma.file({ id: fileId });
        let isImg;
        if (File) {
          if (File.mimetype.substring(0, 5) === "image") {
            isImg = true;
          } else {
            isImg = false;
          }
          const post = await prisma.createPost({
            user: {
              connect: {
                id: user.id
              }
            },
            title,
            content,
            file: {
              connect: {
                id: File.id
              }
            },
            isImg
          });
          return post;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    }
  }
};
