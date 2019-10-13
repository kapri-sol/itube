import React from "react";
import styled from "../../Styles/typed-components";
import Avatar from "../Avatar";
import { host } from "../../Apollo/Client";

const Wrapper = styled.div`
  display: flex;
`;

const User = styled.div`
  margin-left: 10px;
`;

const UserData = styled.div`
  display: flex;
  padding: 5px 0;
  height: 30px;
`;
const UserName = styled.div`
  padding-right: 5px;
  font-size: 18px;
  font-weight: 500;
`;
const Comment = styled.div``;

const UpdatedAt = styled.div`
  font-size: 14px;
  color: #727272;
`;

export default ({ user: { avatar, username }, text, updatedAt }) => {
  return (
    <Wrapper>
      <Avatar url={host + "/" + avatar} size={"sm"} />
      <User>
        <UserData>
          <UserName>{username}</UserName>
          <UpdatedAt>{updatedAt}</UpdatedAt>
        </UserData>
        <Comment>{text}</Comment>
      </User>
    </Wrapper>
  );
};
