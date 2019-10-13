import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "./EditQueries";
import EditPresenter from "./EditPresenter";
import { ProfileEdit, ChangePass } from "./EditComponent";

export default () => {
  const { data, loading } = useQuery(ME);
  const [select, setSelect] = useState("profile");

  const ViewContent = () => {
    if (select === "profile") {
      return <ProfileEdit me={data.me} />;
    } else if (select === "password") {
      return <ChangePass me={data.me} />;
    } else {
      return null;
    }
  };

  return (
    <EditPresenter
      loading={loading}
      data={data}
      select={select}
      setSelect={setSelect}
      ViewContent={ViewContent}
    />
  );
};
