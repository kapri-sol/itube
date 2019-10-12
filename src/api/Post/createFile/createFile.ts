import { prisma } from "../../../../generated/prisma-client";
import fs, { createWriteStream } from "fs";
import { uploadPath } from "../../../../upload";
import { filePreview, getExtOfFile } from "../../../utils/fileManage";
import path from "path";

export default {
  Mutation: {
    createFile: async (_, { file }) => {
      const {
        filename,
        mimetype,
        encoding,
        createReadStream
      } = await file.then(value => {
        return value;
      });
      const File = await prisma.createFile({ filename, mimetype, encoding });
      try {
        const day = File.createdAt;
        const dayPath =
          day.substring(0, 4) +
          "/" +
          day.substring(5, 7) +
          "/" +
          day.substring(8, 10);
        const dirPath = path.join(uploadPath, mimetype, dayPath);
        await fs.mkdirSync(dirPath, { recursive: true });
        let readStream = createReadStream();
        const fileName = File.id + getExtOfFile(filename);
        const filePath = dirPath + "/" + fileName;
        let writeStream = createWriteStream(filePath);
        if (mimetype.substring(0, 5) === "video") {
          readStream
            .pipe(writeStream)
            .on("finish", async () => filePreview(filePath, File.id, dirPath));
        } else {
          readStream.pipe(writeStream);
        }
        return File;
      } catch (err) {
        if (File) await prisma.deleteFile({ id: File.id });
        return null;
      }
    }
  }
};
