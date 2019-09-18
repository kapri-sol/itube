export default {
  Query: {
    me: async (_, __, context) => {
      try {
        return context.req.user;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
