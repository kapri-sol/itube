import React from "react";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

interface IProps {
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: any;
  type?: string;
  name?: any;
}

const Input: React.SFC<IProps> = ({
  placeholder = "",
  required = true,
  value,
  onChange,
  type = "text",
  name
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    name={name}
  />
);

export default Input;
