import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { GET_USER, DELETE_POST } from "./ProfileQueries";

export default withRouter(({ match: { params: { username } } }) => {
  const [select, setSelect] = useState("게시물");
  const [postSelect, setPostSelect] = useState({});
  const [edit, setEdit] = useState("편집");

  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const [delPost] = useMutation(DELETE_POST);

  return (
    <ProfilePresenter
      loading={loading}
      data={data}
      select={select}
      setSelect={setSelect}
      postSelect={postSelect}
      setPostSelect={setPostSelect}
      edit={edit}
      setEdit={setEdit}
      delPost={delPost}
    />
  );
});
