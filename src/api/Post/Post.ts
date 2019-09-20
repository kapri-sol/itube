import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    file: ({ id }) => prisma.post({ id }).file(),
    user: ({ id }) => prisma.post({ id }).user(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    isLiked: (parent, _, { req }) => {
      const { user } = req;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count()
  }
};
