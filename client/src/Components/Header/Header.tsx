import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import Input from "../Input";
import useInput from "../../Hooks/useInput";
import { User, LogOut } from "../Icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "../Button";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
  text-decoration: none;
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-wieght: 200;
  }
`;

const LogoLink = styled(Link)`
  font-size: 30px;
`;

const HeaderLink = styled.div`
  padding: 0 10px;
  cursor: pointer;
  $:not(:last-child) {
    margin-right: 30px;
  }
`;

const UserIcon = styled.div`
  display: flex;
`;
const LoginButton = styled.div`
  width: 30%;
`;

const ME = gql`
  query {
    me {
      username
    }
  }
`;

const LOG_OUT = gql`
  mutation logedUserOut {
    logedUserOut @client
  }
`;

export default ({ isLoggedIn }) => {
  const search = useInput("");
  const { data, loading } = useQuery(ME, { skip: !isLoggedIn });
  const [logOut] = useMutation(LOG_OUT);
  const onSearchSubmit = e => {
    e.preventDefault();
    window.location.replace(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <LogoLink to="/">itube</LogoLink>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput {...search} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          {isLoggedIn ? (
            <UserIcon>
              <HeaderLink>
                {!loading && data && data.me ? (
                  <div
                    onClick={() => {
                      window.location.assign(`/user/${data.me.username}`);
                    }}
                  >
                    <User />
                  </div>
                ) : (
                  <User />
                )}
              </HeaderLink>
              <HeaderLink>
                <div
                  onClick={async () => {
                    await logOut();
                    window.location.replace("/");
                  }}
                >
                  <LogOut />
                </div>
              </HeaderLink>
            </UserIcon>
          ) : (
            <LoginButton>
              <Button
                text={"로그인"}
                onClick={() => window.location.assign("/auth")}
              />
            </LoginButton>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
