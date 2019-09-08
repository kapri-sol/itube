import bcrypt from "bcrypt";

const BCRYPT_ROUNDS: number = 10;

export const hashPass = password => bcrypt.hash(password, BCRYPT_ROUNDS);
export const comparePass = (pass, verifyPass) =>
  bcrypt.compare(pass, verifyPass);
