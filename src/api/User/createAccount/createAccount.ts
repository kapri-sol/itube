import { prisma } from "../../../../generated/prisma-client";
import { hashPass } from "../../../utils/hashPass";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, password, firstName = "", lastName = "" } = args;
      const user = await prisma.createUser({
        email,
        username,
        firstName,
        lastName,
        password: await hashPass(password)
      });
      return user;
    }
  }
};
