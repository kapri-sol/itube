import ffmpeg from "fluent-ffmpeg";

export const getExtOfFile = filename => {
  const fileLen = filename.length;
  const lastDot = filename.lastIndexOf(".");
  return filename.substring(lastDot, fileLen);
};

export const filePreview = async (fileInput, fileId, dirPath) => {
  await ffmpeg(fileInput)
    .duration(5)
    .output(dirPath + "/" + fileId + ".gif")
    .run();
  await ffmpeg(fileInput).screenshots({
    timestamps: [0],
    filename: fileId + ".png",
    folder: dirPath,
    size: "320x240"
  });
};
