import React from "react";
import styled from "../../Styles/typed-components";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  ${props => props.theme.whiteBox}
  text-align: center;
  // width: 50%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 250px;
  margin: 0 auto;
  button {
    height: 30px;
    width: 30%;
  }
`;

const Icon = styled.div`
  font-size: 15px;
`;

const Header = styled.div`
  font-size: 25px;
  font-weight: 200;
`;

const Link = styled.div``;

export default ({ FILE, ICON, Location }) => {
  return (
    <Wrapper>
      <Icon>{ICON}</Icon>
      <Header>{FILE} 업로드</Header>
      <Link>
        <Button
          text={"업로드"}
          onClick={() => window.location.assign(Location)}
        />
      </Link>
    </Wrapper>
  );
};
