import { prisma } from "../../../generated/prisma-client";
import { getExtOfFile } from "../../utils/fileManage";

export default {
  User: {
    url: async ({ id }) => {
      const avatar = await prisma.user({ id }).avatar();
      if (avatar) {
        const url =
          "http://localhost:4000/" +
          avatar.mimetype +
          "/" +
          avatar.createdAt.substring(0, 4) +
          "/" +
          avatar.createdAt.substring(5, 7) +
          "/" +
          avatar.createdAt.substring(8, 10) +
          "/" +
          avatar.id +
          getExtOfFile(avatar.filename);
        console.log(url);
        return url;
      } else {
        return "http://localhost:4000/default/avatar.svg";
      }
    },
    posts: ({ id }) => prisma.user({ id }).posts(),
    subscribes: ({ id }) => prisma.user({ id }).subscribes(),
    subscribers: ({ id }) => prisma.user({ id }).subscribers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    subscribersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { subscribes_some: { id } } })
        .aggregate()
        .count(),
    subscribesCount: ({ id }) =>
      prisma
        .usersConnection({ where: { subscribers_none: { id } } })
        .aggregate()
        .count(),
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isSubscribe: async (parent, _, { req }) => {
      const { user } = req;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              subscribes_some: {
                id: parentId
              }
            }
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { req }) => {
      const { user } = req;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
