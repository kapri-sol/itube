import React from "react";
import styled from "Styles/typed-components";

interface IProps {
  text?: string;
  className?: any;
}
const Text = styled.span`
  font-weight: 600;
`;

const FatText: React.SFC<IProps> = ({ text, className }) => (
  <Text className={className}>{text}</Text>
);

export default FatText;
