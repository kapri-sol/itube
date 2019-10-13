import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import { useMutation } from "@apollo/react-hooks";
import Avatar from "../../Components/Avatar";
import { EDIT, CH_PASS } from "./EditQueries";
import { toast } from "react-toastify";

const User = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const UserWrapper = styled.div`
display: flex;
width: 100%;
margin 20px 0;
`;

const AvatarDiv = styled.div`
  width: 30%;
  div {
    margin: 0 0 0 auto;
  }
`;

const UserLeft = styled.div`
  font-size: 16px;
  font-weight: 600;
  width: 30%;
  text-align: right;
  margin: auto 0;
`;

const UserRight = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.blueColor};
`;

const AvatarChange = styled.input`
  width: 0;
  height: 0;
  border: 0;
`;

const Form = styled.form`
  padding: 10px 0;
`;

const Input = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  padding: 5px 10px;
  font-size: 18px;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Button = styled.button`
  font-size: 14px;
  font-weight: bold;
  color: white;
  width: 50px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  background-color: ${props => props.theme.blueColor};
`;

const useInput = defaultValue => {
  const [value, setValue] = useState(defaultValue);
  const onChange = e => {
    const {
      // tslint:disable-next-line:no-shadowed-variable
      target: { value }
    } = e;
    setValue(value);
  };
  return { value, setValue, onChange };
};

export const ProfileEdit = ({ me }) => {
  const [file, setFile] = useState();
  const username = useInput(me.username);
  const firstName = useInput(me.firstName);
  const email = useInput(me.email);

  const [editUser] = useMutation(EDIT, {
    onCompleted() {
      window.location.assign("/user/edit");
    }
  });

  const avatar = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email.value !== "" && username.value !== "") {
      editUser({
        variables: {
          username: username.value,
          firstName: firstName.value,
          email: email.value,
          avatar: file
        }
      });
    } else {
      toast.error("All field are required");
    }
  };

  return (
    <User>
      <UserWrapper>
        <AvatarDiv>
          <Avatar size={"sm"} url={me.url} />
        </AvatarDiv>
        <UserRight>
          <UserName>{username.value}</UserName>
          <Label>
            프로필 사진 바꾸기
            <AvatarChange type="file" onChange={avatar} />
          </Label>
        </UserRight>
      </UserWrapper>
      <Form onSubmit={onSubmit}>
        <UserWrapper>
          <UserLeft>이름</UserLeft>
          <UserRight>
            <Input type="text" {...firstName} />
          </UserRight>
        </UserWrapper>
        <UserWrapper>
          <UserLeft>사용자 이름</UserLeft>
          <UserRight>
            <Input type="text" {...username} />
          </UserRight>
        </UserWrapper>
        <UserWrapper>
          <UserLeft>이메일</UserLeft>
          <UserRight>
            <Input type="text" {...email} />
          </UserRight>
        </UserWrapper>
        <ButtonWrapper>
          <Button>제출</Button>
        </ButtonWrapper>
      </Form>
    </User>
  );
};

export const ChangePass = ({ me }) => {
  const password = useInput("");
  const newPassword = useInput("");
  const checkPassword = useInput("");

  const [changePassword] = useMutation(CH_PASS, {
    // tslint:disable-next-line:no-shadowed-variable
    onCompleted({ changePassword }) {
      // console.log(changePassword)
      if (changePassword) {
        window.location.assign("/user/edit");
      } else {
        toast.error("failed");
      }
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    if (
      password.value === "" ||
      newPassword.value === "" ||
      checkPassword.value === ""
    ) {
      toast.error("All field are required");
    } else if (newPassword.value !== checkPassword.value) {
      toast.error("password not same ");
    } else {
      changePassword({
        variables: {
          password: password.value,
          newPassword: newPassword.value
        }
      });
    }
  };
  return (
    <User>
      <UserWrapper>
        <AvatarDiv>
          <Avatar size={"sm"} url={me.url} />
        </AvatarDiv>
        <UserRight>
          <UserName>{me.username}</UserName>
        </UserRight>
      </UserWrapper>
      <Form onSubmit={onSubmit}>
        <UserWrapper>
          <UserLeft>이전 비밀번호</UserLeft>
          <UserRight>
            <Input type="password" {...password} />
          </UserRight>
        </UserWrapper>
        <UserWrapper>
          <UserLeft>새 비밀번호</UserLeft>
          <UserRight>
            <Input type="password" {...newPassword} />
          </UserRight>
        </UserWrapper>
        <UserWrapper>
          <UserLeft>비밀번호 확인</UserLeft>
          <UserRight>
            <Input type="password" {...checkPassword} />
          </UserRight>
        </UserWrapper>
        <ButtonWrapper>
          <Button>변경</Button>
        </ButtonWrapper>
      </Form>
    </User>
  );
};
