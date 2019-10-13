import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN, FEED_ALL_QUERY, FEED_QUERY } from "./HomeQueries";
import HomePresenter from "./HomePresenter";

export default () => {
  const { data } = useQuery(IS_LOGGED_IN);

  const allFeed = useQuery(FEED_ALL_QUERY);

  const videoFeed = useQuery(FEED_QUERY, {
    variables: {
      isImg: false
    },
    skip: !data.auth.isLoggedIn
  });

  const imgFeed = useQuery(FEED_QUERY, {
    variables: {
      isImg: true
    },
    skip: !data.auth.isLoggedIn
  });

  return (
    <HomePresenter allFeed={allFeed} videoFeed={videoFeed} imgFeed={imgFeed} />
  );
};
