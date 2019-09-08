import { prisma } from "../../../../generated/prisma-client";
import { comparePass } from "../../../utils/hashPass";

export default {
  Mutation: {
    emailSignIn: async (_, args) => {
      const { email, password } = args;
      try {
        const user = await prisma.user({ email });
        if (!user)
          return {
            ok: false,
            error: "No User found with that email",
            token: null
          };
        else {
          const checkPass = await comparePass(password, user.password);
          if (!checkPass)
            return {
              ok: false,
              error: "Wrong password",
              token: null
            };
          else {
            return {
              ok: true,
              error: null,
              token: "Coming soon"
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};
