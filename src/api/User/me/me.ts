export default {
  Query: {
    me: async (_, __, { req }) => {
      try {
        const { user } = req;
        return user;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  }
};
