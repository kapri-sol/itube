import React from "react";
import styled from "../../Styles/typed-components";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";

const Wrapper = styled.div``;

const AllWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: ${props => props.theme.boxBorder};
`;
const ImgWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: ${props => props.theme.boxBorder};
`;

const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: ${props => props.theme.boxBorder};
`;

const Subject = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
`;

export default ({ imgFeed, videoFeed, allFeed }) => {
  return (
    <Wrapper>
      {(imgFeed.loading || videoFeed.loading || allFeed.loading) && <Loader />}
      {!allFeed.loading && allFeed.data && allFeed.data.seeAllPost.length ? (
        <div>
          <Subject>All</Subject>
          <AllWrapper>
            {!allFeed.loading &&
              allFeed.data &&
              allFeed.data.seeAllPost &&
              allFeed.data.seeAllPost.map(post => (
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
              ))}
          </AllWrapper>
        </div>
      ) : null}
      {!videoFeed.loading && videoFeed.data && videoFeed.data.seeFeed.length ? (
        <div>
          <Subject>Video</Subject>
          <VideoWrapper>
            {!videoFeed.loading &&
              videoFeed.data &&
              videoFeed.data.seeFeed &&
              videoFeed.data.seeFeed.map(post => (
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
              ))}
          </VideoWrapper>
        </div>
      ) : null}
      {!imgFeed.loading && imgFeed.data && imgFeed.data.seeFeed.length ? (
        <div>
          <Subject>Photo</Subject>
          <ImgWrapper>
            {!imgFeed.loading &&
              imgFeed.data &&
              imgFeed.data.seeFeed &&
              imgFeed.data.seeFeed.map(post => (
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
              ))}
          </ImgWrapper>
        </div>
      ) : null}
    </Wrapper>
  );
};
