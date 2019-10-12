import { prisma } from "../../../../generated/prisma-client";
import { comparePass, hashPass } from "../../../utils/hashPass";

export default {
  Mutation: {
    changePassword: async (_, args, { req }) => {
      const { password, newPassword } = args;
      const { user } = req;

      const checkPass = await comparePass(password, user.password);

      if (checkPass) {
        await prisma.updateUser({
          where: { id: user.id },
          data: { password: await hashPass(newPassword) }
        });
        return true;
      } else {
        return false;
      }
    }
  }
};
