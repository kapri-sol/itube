import { prisma } from "../../../../generated/prisma-client";
import { hashPass } from "../../../utils";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, password, firstName = "", lastName = "" } = args;
      const user = await prisma.createUser({
        username,
        email,
        password: await hashPass(password),
        firstName,
        lastName
      });
      return user;
    }
  }
};
