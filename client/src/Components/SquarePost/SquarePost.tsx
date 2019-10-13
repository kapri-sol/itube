import React from "react";
import styled from "../../Styles/typed-components";
import { HeartFull, CommentFull } from "../Icons";

interface IProps {
  bg: string;
}

const Container = styled.div`
  background-image: url(${(props: IProps) => props.bg});
  background-size: cover;
  cursr: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Num = styled.div`
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin: 0 10px;
  font-size: 16px;
`;

const SquarePost = ({ likeCount, commentCount, file }) => (
  <Container bg={file.url}>
    <Wrapper />
    <Num>
      <HeartFull />
      <NumberText>{likeCount}</NumberText>
      <CommentFull />
      <NumberText>{commentCount}</NumberText>
    </Num>
  </Container>
);

export default SquarePost;
