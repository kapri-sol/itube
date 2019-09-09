export default {
  Query: {
    user: async (_, args, context) => {
      try {
        return context.req.user;
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }
};
