import { prisma } from "../../../generated/prisma-client";
import { getExtOfFile } from "../../utils/fileManage";

export default {
  File: {
    url: async ({ id }) => {
      const file = await prisma.file({ id });
      try {
        if (file) {
          const { id, mimetype, filename, createdAt } = file;
          const url =
            "http://localhost:4000/" +
            mimetype +
            "/" +
            createdAt.substring(0, 4) +
            "/" +
            createdAt.substring(5, 7) +
            "/" +
            createdAt.substring(8, 10) +
            "/" +
            id +
            getExtOfFile(filename);
          return url;
        } else {
          return "null";
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }
};
