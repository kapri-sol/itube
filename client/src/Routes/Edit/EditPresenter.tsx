import React from "react";
import styled from "../../Styles/typed-components";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  display: flex;
  height: 500px;
  ${props => props.theme.whiteBox}
`;

const Menu = styled.ul`
  width: 25%;
  border-right: ${props => props.theme.boxBorder};
`;

const View = styled.div`
  width: 75%;
`;

const CommonTab = styled.li`
  width: 100%;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 500;
  border-left: solid 2px white;
  cursor: pointer;
`;

const SelectedTab = styled.div`
  width: 100%;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  border-left: solid 2px black;
  cursor: pointer;
`;

export default ({ loading, data, select, setSelect, ViewContent }) => {
  const TabSelect = ({ stateValue, name }) => {
    const onClick = () => {
      setSelect(stateValue);
    };
    if (select === stateValue) {
      return <SelectedTab>{name}</SelectedTab>;
    } else {
      return <CommonTab onClick={onClick}>{name}</CommonTab>;
    }
  };
  if (loading) {
    return <Loader />;
  } else if (data && data.me) {
    return (
      <Wrapper>
        <Menu>
          <TabSelect stateValue={"profile"} name={"프로필 편집"} />
          <TabSelect stateValue={"password"} name={"비밀번호 변경"} />
          <TabSelect stateValue={"video"} name={"동영상 편집"} />
          <TabSelect stateValue={"photo"} name={"사진 편집"} />
        </Menu>
        <View>
          <ViewContent />
        </View>
      </Wrapper>
    );
  } else {
    return null;
  }
};
