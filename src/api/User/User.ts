import { prisma } from "../../../generated/prisma-client";
const defaultAvatar = "/default/user.png";

export default {
  User: {
    avatar: async ({ id }) => {
      const avatar = await prisma.user({ id }).avatar();
      if (avatar) {
        return avatar;
      } else {
        return defaultAvatar;
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
