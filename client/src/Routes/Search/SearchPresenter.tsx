import React from "react";
import styled from "../../Styles/typed-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text={"Search for something"} />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchPost) {
    return (
      <Wrapper>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text={"No Posts Found"} />
          ) : (
            data.searchPost.map(post => (
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
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  } else {
    return null;
  }
};
