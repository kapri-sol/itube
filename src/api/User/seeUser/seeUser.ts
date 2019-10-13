import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username } = args;
      try {
        const user = prisma.user({ username });
        if (user) {
          return user;
        } else {
          console.log("no user");
          return "nop";
        }
      } catch (err) {
        console.log(err);
        return "nop";
      }
    }
  }
};
