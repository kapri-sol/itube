import React, { useState } from "react";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_LIKE } from "./PostQueries";

const PostContainer = ({
  id,
  user,
  title,
  file,
  likeCount,
  isLiked,
  createdAt
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };
  return (
    <PostPresenter
      id={id}
      user={user}
      title={title}
      file={file}
      likeCount={likeCountS}
      isLikedS={isLikedS}
      createdAt={createdAt}
      toggleLike={toggleLike}
    />
  );
};

export default PostContainer;
