import React from "react";
import styled from "../../Styles/typed-components";
import Loeader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Post from "../../Components/Post";
import ToUplad from "./ToUpload";
import Button from "../../Components/Button";
import {
  Feed,
  UploadVideo,
  Camera,
  Upload,
  Photo
} from "../../Components/Icons";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div`
  margin: 0 20px;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const ProfileEdit = styled.div`
  margin-left: 20px;
  width: 60px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Select = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  border-top: ${props => props.theme.boxBorder};
`;

const SelectDiv = styled.div`
  margin-bottom: 20px;
  width: 150px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const CommonButton = styled.div`
  display: flex;
  margin: -1px auto 0;
  width: 50%;
  border-top: solid 0.5px ${props => props.theme.bgColor};
  padding-top: 15px;
  color: #999999;
`;

const SelectedButton = styled.div`
  display: flex;
  margin: -1px auto 0;
  width: 50%;
  border-top: solid 0.5px black;
  padding-top: 15px;
  color: black;
`;

const IconDiv = styled.div`
  margin-right: 10px;
`;
const SelectedDiv = styled.div`
  vertical-align: center;
`;

const NoPost = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  margin-bottom: 30px;
  width: 20%;
`;
const ButtonBetween = styled.div`
  width: 75px;
`;

const CheckBox = styled.input`
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 2;
`;

const EditButton = styled.div`
  width: 12%;
  margin: 0 0 20px auto;
`;

export default ({
  loading,
  data,
  select,
  setSelect,
  postSelect,
  setPostSelect,
  edit,
  setEdit,
  delPost
}) => {
  if (loading) {
    return (
      <Wrapper>
        <Loeader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      username,
      url,
      isSelf,
      posts,
      postsCount,
      subscribesCount,
      subscribersCount
    } = data.seeUser;
    const SeletButton = ({ thisButton, Icon }) => {
      return (
        <SelectDiv>
          {select === thisButton ? (
            <SelectedButton>
              <IconDiv>
                <Icon />
              </IconDiv>
              {thisButton}
            </SelectedButton>
          ) : (
            <CommonButton onClick={() => setSelect(thisButton)}>
              <IconDiv>
                <Icon />
              </IconDiv>
              {thisButton}
            </CommonButton>
          )}
        </SelectDiv>
      );
    };
    const SelectedPage = () => {
      if (select === "게시물") {
        if (posts.length === 0) {
          return <NoPost>게시물이 없습니다.</NoPost>;
        } else {
          return (
            <div>
              <EditButton>
                <Button
                  text={edit}
                  onClick={() => {
                    if (edit === "편집") {
                      setEdit("취소");
                    } else {
                      setEdit("편집");
                    }
                  }}
                />
              </EditButton>
              <Posts>
                {posts &&
                  posts.map(post => (
                    <div key={"div" + post.id}>
                      {isSelf && edit === "취소" ? (
                        <div>
                          <CheckBox
                            key={post.id}
                            type="checkbox"
                            name={post.id}
                            checked={postSelect[post.id]}
                            onChange={async e => {
                              await setPostSelect({
                                ...postSelect,
                                [e.target.name]: e.target.checked
                              });
                            }}
                          />
                        </div>
                      ) : null}
                      <Post
                        key={post.id}
                        id={post.id}
                        user={post.user}
                        title={post.title}
                        file={post.file}
                        likeCount={post.likeCount}
                        isLiked={post.isLiked}
                        createdAt={post.createdAt}
                      />
                    </div>
                  ))}
              </Posts>
              {isSelf && edit === "취소" ? (
                <ButtonWrapper>
                  <ButtonBetween>
                    <Button
                      text={"삭제"}
                      onClick={async () => {
                        if (
                          Object.values(postSelect).filter(Boolean).length > 0
                        ) {
                          toast.error("삭제");
                          for (const [key] of Object.entries(postSelect)) {
                            await delPost({
                              variables: { id: key }
                            });
                          }
                          window.location.assign(`/user/${username}`);
                        } else {
                          toast.error("삭제할 영상을 선택하세요");
                        }
                      }}
                    />
                  </ButtonBetween>
                </ButtonWrapper>
              ) : null}
            </div>
          );
        }
      } else if (select === "동영상") {
        return (
          <ToUplad FILE={"동영상"} ICON={Upload(70)} Location={"/upload"} />
        );
      } else if (select === "사진") {
        return <ToUplad FILE={"사진"} ICON={Photo(70)} Location={"/upload"} />;
      } else {
        return null;
      }
    };
    return (
      <>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={url} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <ProfileEdit>
                  <Button
                    text={"편집"}
                    onClick={() => window.location.assign("/user/edit")}
                  />
                </ProfileEdit>
              ) : null}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
            </Counts>
            <Counts>
              <Count>
                <FatText text={String(subscribesCount)} /> subscribe
              </Count>
            </Counts>
            <Counts>
              <Count>
                <FatText text={String(subscribersCount)} /> subscriber
              </Count>
            </Counts>
          </HeaderColumn>
        </Header>
        <Select>
          <SeletButton thisButton={"게시물"} Icon={Feed} />
          <SeletButton thisButton={"동영상"} Icon={UploadVideo} />
          <SeletButton thisButton={"사진"} Icon={Camera} />
        </Select>
        <SelectedDiv>
          <SelectedPage />
        </SelectedDiv>
      </>
    );
  } else {
    return null;
  }
};
