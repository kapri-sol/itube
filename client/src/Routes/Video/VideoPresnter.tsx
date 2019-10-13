import React from "react";
import styled from "../../Styles/typed-components";
import Loader from "../../Components/Loader";
import { Player, ControlBar } from "video-react";
import "../../../node_modules/video-react/dist/video-react";
import { HeartEmpty } from "../../Components/Icons";
import Avatar from "../../Components/Avatar";
import CommentBox from "../../Components/CommentBox";
import SubscribeButton from "../../Components/SubscribeButton";
import Button from "../../Components/Button";
import useInput from "../../Hooks/useInput";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  margin: 0 15px;
  border-bottom: ${props => props.theme.boxBorder};
`;

const Title = styled.div`
  height: 50px;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 400;
  color: #0d0d0d;
`;

const Sub = styled.div`
  display: flex;
  justify-content: space-between;
`;
const View = styled.div`
  padding-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #727272;
`;

const Like = styled.div`
  display: flex;
`;
const LikeCount = styled.div`
  margin: 0 5px;
  font-size: 16px;
`;

const ContentWrapper = styled.div`
  margin: 0 15px;
  padding: 10px 0;
  border-bottom: ${props => props.theme.boxBorder};
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserName = styled.div`
  padding: 5px 0;
  font-size: 18px;
  font-weight: 400;
`;
const UserSub = styled.div`
  display: flex;
  width: 100%;
`;

const UserData = styled.div`
  width: 100%;
  margin-left: 10px;
`;
const CreatedAt = styled.div`
  color: #727272;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  width: 20%;
`;

const Content = styled.div`
  padding: 10px 0;
  min-height: 50px;
  font-weight: 400;
  font-size: 14px;
  color: #0d0d0d;
`;

const CommentWrapper = styled.div`
    padding 0 15px;
`;

const UserComment = styled.div`
  flex-grow: 19;
`;

const CommentAvatar = styled.div`
  flex-grow: 1;
`;

const Line = styled.div`
  margin-bottom: 5px;
  height: 0;
  width: 100%;
  background-color: black;
  transform: scaleX(0);
`;

const CommentInput = styled.input`
  height: 40px;
  width: 100%;
  border: none;
  border-bottom: ${props => props.theme.boxBorder};
  &:focus {
    border-bottom: 0px;
    transition: 0.25s;
  }
  &:focus + ${Line} {
    height: 2px;
    transform: scaleX(1);
    transition: transform 0.25s;
  }
`;

const Comments = styled.div``;

const CancelButton = styled.button`
  margin: 5px;
  width: 50px;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: black;
  font-weight: 400;
  background-color: white;
  text-aligin: center;
  padding: 7px 0px;
  font-size: 14px;
`;

const CommentButton = styled.button`
  margin: 5px;
  width: 50px;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 400;
  background-color: #cccccc;
  text-aligin: center;
  padding: 7px 0px;
  font-size: 14px;
`;

const CommentButtons = styled.div`
  text-align: right;
`;

const Form = styled.form`
  display: flex;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.div`
  width: 45%;
`;

const TitleInput = styled.input`
  width: 100%;
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: white;
  font-size: 18px;
`;

const ContentInput = styled.textarea`
  border: 0;
  height: 100%;
  width: 100%;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: white;
  font-size: 14px;
`;

export default ({
  id,
  loading,
  data,
  me,
  action,
  setAction,
  edit,
  setEdit,
  comment,
  addComment,
  onClickInput,
  onClickButton,
  editPost,
  onSubmit
}) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.seePost) {
    const {
      seePost: {
        title,
        content,
        user,
        file,
        views,
        likeCount,
        createdAt,
        comments
      }
    } = data;

    const {
      me: { url }
    } = me;

    const titleEdit = useInput(title);
    const contentEdit = useInput(content);

    return (
      <Wrapper>
        <link
          rel="stylesheet"
          href="https://video-react.github.io/assets/video-react.css"
        />
        <Player src={file.url} type={file.mimetype}>
          <ControlBar autoHide={false} className={"my-class"} />
        </Player>
        <TitleWrapper>
          <Title>
            {user.isSelf && edit === "" ? (
              <TitleInput {...titleEdit} type="text" />
            ) : (
              title
            )}
          </Title>
          <Sub>
            <View>조회수 {views} 회</View>
            <Like>
              <HeartEmpty size={20} />
              <LikeCount>{likeCount}</LikeCount>
            </Like>
          </Sub>
        </TitleWrapper>
        <ContentWrapper>
          <User>
            <UserSub>
              <Avatar url={user.url} size={"sm"} />
              <UserData>
                <UserName>{user.username}</UserName>
                <CreatedAt>게시일: {createdAt.substring(0, 10)}</CreatedAt>
                <Content>
                  {user.isSelf && edit === "" ? (
                    <ContentInput {...contentEdit} />
                  ) : (
                    content
                  )}
                </Content>
              </UserData>
            </UserSub>
            <ButtonWrapper>
              {user.isSelf ? (
                edit === "수정" ? (
                  <Button text={edit} onClick={() => setEdit("")} />
                ) : (
                  <EditButtonWrapper>
                    <EditButton>
                      <Button
                        text="취소"
                        onClick={() => {
                          setEdit("수정");
                          titleEdit.setValue(title);
                          contentEdit.setValue(content);
                        }}
                      />
                    </EditButton>
                    <EditButton>
                      <Button
                        text="완료"
                        onClick={async () => {
                          await editPost({
                            variables: {
                              id,
                              title: titleEdit.value,
                              content: contentEdit.value
                            }
                          });
                          // window.location.assign(`/video/${id}`);
                        }}
                      />
                    </EditButton>
                  </EditButtonWrapper>
                )
              ) : (
                <SubscribeButton isSubscribe={user.isSubscribe} id={user.id} />
              )}
            </ButtonWrapper>
          </User>
        </ContentWrapper>
        <CommentWrapper>
          <Form onSubmit={onSubmit}>
            <CommentAvatar>
              <Avatar url={url} size={"sm"} />
            </CommentAvatar>
            <UserComment>
              <CommentInput
                placeholder={"공개 댓글 추가..."}
                onClick={onClickInput}
                {...comment}
              />
              <Line />
              <CommentButtons>
                {action === "display" ? (
                  <div>
                    <CancelButton onClick={onClickButton}>취소</CancelButton>
                    <CommentButton type={"submit"}>댓글</CommentButton>
                  </div>
                ) : null}
              </CommentButtons>
            </UserComment>
          </Form>
        </CommentWrapper>
        <Comments>
          {comments &&
            comments.map(cmnt => (
              <CommentBox
                key={cmnt.id}
                user={cmnt.user}
                text={cmnt.text}
                updatedAt={cmnt.updatedAt}
              />
            ))}
        </Comments>
      </Wrapper>
    );
  } else {
    return null;
  }
};
