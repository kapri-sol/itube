import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import VideoPresenter from "./VideoPresnter";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import { GET_VIDEO, ME, ADD_COMMENT, EDIT_POST } from "./VideoQuries";

export default withRouter(({ match: { params: { id } } }) => {
  const [action, setAction] = useState("none");
  const [edit, setEdit] = useState("수정");
  const comment = useInput("");

  const onClickInput = () => setAction("display");
  const onClickButton = () => setAction("none");
  const onClickComntBtn = () => {
    onClickButton();
    comment.setValue("");
  };

  const { data, loading } = useQuery(GET_VIDEO, { variables: { postId: id } });
  const me = useQuery(ME);
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value
    }
  });
  const [editPost] = useMutation(EDIT_POST, {
    onCompleted(e) {
      console.log(e);
    }
  });
  const onSubmit = e => {
    e.preventDefault();
    if (comment.value === "") {
      toast.error("add comment");
    } else {
      addComment();
      onClickComntBtn();
    }
  };
  return (
    <VideoPresenter
      id={id}
      data={data}
      loading={loading || me.loading}
      me={me.data}
      action={action}
      setAction={setAction}
      edit={edit}
      setEdit={setEdit}
      comment={comment}
      addComment={addComment}
      onClickInput={onClickInput}
      onClickButton={onClickButton}
      editPost={editPost}
      onSubmit={onSubmit}
    />
  );
});
