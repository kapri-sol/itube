export const defaults = {
  auth: {
    __typename: "Auth",
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
  }
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          auth: {
            __typename: "Auth",
            isLoggedIn: true
          }
        }
      });
      return null;
    },
    logedUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      // window.location.reload();
      cache.writeData({
        data: {
          __typename: "Auth",
          isLoggedIn: false
        }
      });
      return null;
    }
  }
};
