import jwt from "jsonwebtoken";
import { prisma } from "../../generated/prisma-client";
import "../env";

const decodeJWT = async (token: string) => {
  try {
    const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");
    const { id } = decode;
    const user = await prisma.user({ id });
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
