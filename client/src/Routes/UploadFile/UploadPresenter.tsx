import React from "react";
import styled from "../../Styles/typed-components";
import Input from "Components/Input";
import Button from "Components/Button";
import Loader from "../../Components/Loader";

const Wrapper = styled.form`
  ${props => props.theme.whiteBox};
  display: flex;
  height: 750px;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 20px;
  width: 350px;
  height: 600px;
  font-size: 15px;
  font-weight: 600;
  border-width: 1px;
  border-radius: 5px;
  border-style: dashed;
  border-color: #e6e6e6;
  background-color: ${props => props.theme.bgColor};
  transition: border 0.24s ease-in-out;
  p {
    padding: 50px 0px;
  }
`;

const Edit = styled.div`
  margin: 30px 20px;
  padding: 0 20px;
  width: 500px;
  font-size: 20px;
  line-height: 50px;
  h2 {
    font-size: 30px;
    font-weight: 100;
    margin-bottom: 30px;
  }
  input,
  textarea {
    display: block;
    width: 400px;
    margin: 10px 0;
  }
  button {
    width: 100px;
  }
  div {
    font-weight: bold;
  }
`;

const Textarea = styled.textarea`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 70px;
  font-size: 12px;
  padding: 5px 15px;
`;

const Plus = styled.div`
  font-size: 150px;
  font-weight: 100;
  color: ${props => props.theme.blueColor};
`;

export default ({
  onSubmit,
  onDrop,
  getRootProps,
  getInputProps,
  isDragActive,
  file,
  loading,
  title,
  content
}) => {
  return (
    <Wrapper onSubmit={onSubmit}>
      <DropZone {...onDrop} {...getRootProps()}>
        <input type={"file"} {...getInputProps()} />
        {file ? null : <Plus>+</Plus>}
        {file ? (
          loading ? (
            <Loader />
          ) : (
            "끝"
          )
        ) : isDragActive ? (
          <p>여기다 끌어놓으세요</p>
        ) : (
          <p>동영상 파일을 끌어다 놓으세요</p>
        )}
      </DropZone>
      <Edit>
        <h2>새 비디오 추가</h2>
        <div>상세정보</div>
        <Input placeholder={"제목"} type={"text"} {...title} />
        <Textarea placeholder="설명" {...content} />
        <Button text={"게시"} />
      </Edit>
    </Wrapper>
  );
};
