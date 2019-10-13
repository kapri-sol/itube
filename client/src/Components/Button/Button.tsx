import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.blueColor};
  text-aligin: center;
  padding: 7px 0px;
  font-size: 14px;
`;

interface IProps {
  text?: string;
  type?: any;
  onClick?: any;
}

const Button: React.SFC<IProps> = ({ text, type = "submit", onClick }) => (
  <Container type={type} onClick={onClick}>
    {text}
  </Container>
);

export default Button;
