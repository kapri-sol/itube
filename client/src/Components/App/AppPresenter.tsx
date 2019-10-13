import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../../Routes/Home";
import Auth from "../../Routes/Auth/AuthContainer";
import Profile from "../../Routes/Profile";
import Search from "../../Routes/Search";
import Upload from "../../Routes/Upload";
import Video from "../../Routes/Video";
import Edit from "../../Routes/Edit";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/profile" component={Profile} />
    <Route path="/search" component={Search} />
    <Route path="/video/:id" component={Video} />
    <Route path="/user/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/search" component={Search} />
    <Route path="/upload" component={Upload} />
    <Route path="/video/:id" component={Video} />
    <Route path="/user/edit" component={Edit} />
    <Route path="/user/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
