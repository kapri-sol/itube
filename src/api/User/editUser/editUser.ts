import { prisma } from "../../../../generated/prisma-client";
import fileCreate from "../../Post/createFile/createFile";

export default {
  Mutation: {
    editUser: async (_, args, { req }) => {
      const { username, email, firstName, lastName, avatar } = args;
      const { user } = req;

      if (avatar) {
        const {
          Mutation: { createFile }
        } = fileCreate;
        const File = await createFile(_, { file: avatar });

        if (File) {
          const { id } = File;
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              avatar: { connect: { id } }
            }
          });
        }
      }

      const editedUser = await prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          email,
          firstName,
          lastName
        }
      });

      return editedUser;
    }
  }
};
