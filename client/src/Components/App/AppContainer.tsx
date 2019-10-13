import * as React from "react";
import { graphql } from "react-apollo";
import theme from "../../Styles/theme";
import styled, { ThemeProvider } from "../../Styles/typed-components";
import { BrowserRouter as Router } from "react-router-dom";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../../Styles/global-styles";
import Header from "../Header";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

const AppContainer = ({ data }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Header isLoggedIn={data.auth.isLoggedIn} />
          <Wrapper>
            <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
          </Wrapper>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </Router>
      </>
    </ThemeProvider>
  );
};

export default graphql(IS_LOGGED_IN)(AppContainer);
