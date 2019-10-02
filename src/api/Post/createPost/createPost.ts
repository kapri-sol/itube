import { prisma } from "../../../../generated/prisma-client";
import fs, { createWriteStream } from "fs";
import path from "path";
import { uploadPath } from "../../../../upload";
import { getExtOfFile } from "../../../utils/fileManage";
import ffmpeg from "fluent-ffmpeg";

export default {
  Mutation: {
    createPost: async (_, args, { req }) => {
      const { user } = req;
      const { title, content, file } = await args;
      const {
        filename,
        mimetype,
        encoding,
        createReadStream
      } = await file.then(value => {
        return value;
      });
      const stream = createReadStream();

      const File = await prisma.createFile({
        filename,
        mimetype,
        encoding
      });
      const day = File.createdAt;
      const dayPath =
        day.substring(0, 4) +
        "/" +
        day.substring(5, 7) +
        "/" +
        day.substring(8, 10);
      const filePath = path.join(uploadPath, mimetype, dayPath);
      const fileName = filePath + "/" + File.id + getExtOfFile(filename);
      await fs.mkdirSync(filePath, { recursive: true });
      await stream.pipe(createWriteStream(fileName));

      let isImg;
      if (mimetype.substring(0, 5) === "image") {
        isImg = true;
      } else {
        isImg = false;
        ffmpeg(fileName)
          .duration(5)
          .output(filePath + "/" + File.id + ".gif")
          .run();
        ffmpeg(fileName).screenshots({
          timestamps: [0],
          filename: File.id + ".png",
          folder: filePath,
          size: "320x240"
        });
      }

      const post = await prisma.createPost({
        user: {
          connect: {
            id: user.id
          }
        },
        title,
        content,
        file: {
          connect: {
            id: File.id
          }
        },
        isImg
      });
      console.log(post);
      return post;
    }
  }
};
