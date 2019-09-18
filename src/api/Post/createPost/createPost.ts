import { prisma } from "../../../../generated/prisma-client";
import { createWriteStream } from "fs";
import path from "path";
import { uploadPath } from "../../../../upload";
import mkdirp from "mkdirp";

const getExtOfFile = filename => {
  const fileLen = filename.length;
  const lastDot = filename.lastIndexOf(".");
  return filename.substring(lastDot, fileLen);
};

export default {
  Mutation: {
    createPost: async (_, args, { req }) => {
      const { channelId, title, content, file } = await args;
      const {
        filename,
        mimetype,
        encoding,
        createReadStream
      } = await file.then(function(value) {
        return value;
      });
      const stream = createReadStream();

      const File = await prisma.createFile({
        filename,
        mimetype,
        encoding
      });
      const day = new Date();
      const dayPath =
        day.getFullYear() + "/" + day.getMonth() + "/" + day.getDay();
      const filePath = path.join(uploadPath, mimetype, dayPath);
      mkdirp(filePath, async err => {
        if (err) console.error(err);
      });
      stream.pipe(
        createWriteStream(filePath + "/" + File.id + getExtOfFile(filename))
      );
      const post = await prisma.createPost({
        channel: {
          connect: {
            id: channelId
          }
        },
        title,
        content,
        file: {
          connect: {
            id: File.id
          }
        }
      });
      return post;
    }
  }
};
