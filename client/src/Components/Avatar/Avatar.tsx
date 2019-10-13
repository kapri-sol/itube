import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
  size: string;
  url: string;
  className?: any;
}

const getSize = (size: string) => {
  let width: number = 30;
  let height: number = 40;
  if (size === "md") {
    width = 70;
    height = 80;
  } else if (size === "lg") {
    width = 135;
    height = 150;
  }
  return `
      width: ${width}px;
      height: ${height}px;
  `;
};

const Container = styled.div`
  ${(props: IProps) => getSize(props.size)};
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  // border : solid 5px black;
  margin: 5px;
`;

const Avatar: React.SFC<IProps> = ({ size = "sm", url, className }) => (
  <Container className={className} size={size} url={url} />
);

export default Avatar;
