import jwt from "jsonwebtoken";

const createJWT = (id: string): string => {
  const token = jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export default createJWT;
