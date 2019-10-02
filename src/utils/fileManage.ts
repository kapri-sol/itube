export const getExtOfFile = filename => {
  const fileLen = filename.length;
  const lastDot = filename.lastIndexOf(".");
  return filename.substring(lastDot, fileLen);
};
