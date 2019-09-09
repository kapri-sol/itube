import { prisma } from "../../../../generated/prisma-client";
import { comparePass } from "../../../utils/hashPass";
import createJWT from "../../../utils/createJWT";

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
            const token = createJWT(user.id);
            return {
              ok: true,
              error: null,
              token
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
