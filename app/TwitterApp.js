import React, { Component } from "react";
import APIInvoker from "./utils/APIInvoker";
import browserHistory from "./History";
import { Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import TwitterDashboard from "./TwitterDashboard";
import AuthRouter from "./AuthRouter";
import ToolBar from "./ToolBar";

class TwitterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      profile: null,
    };
  }

  componentDidMount() {
    let token = window.localStorage.getItem("token");
    if (token == null) {
      this.setState({
        load: true,
        profile: null,
      });
      browserHistory.push("/login");
    } else {
      APIInvoker.invokeGET(
        "/secure/relogin",
        (response) => {
          this.setState({
            load: true,
            profile: response.profile,
          });
          window.localStorage.setItem("token", response.token);
          window.localStorage.setItem("username", response.profile.userName);
          browserHistory.push("/");
        },
        (error) => {
          console.log("Error autenticando al usuario: ", error);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("username");
          browserHistory.push("/login");
        }
      );
    }
  }

  render() {
    if (!this.state.load) {
      return null;
    }
    return (
      <>
        <ToolBar profile={this.state.profile} />
        <div id="mainApp" className="animate fadeIn">
          <Switch>
            <AuthRouter
              isLoged={this.state.profile != null}
              exact
              path="/"
              component={() => <TwitterDashboard profile={this.state.profile} />}
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <div id="dialog" />
        </div>
      </>
    );
  }
}

export default TwitterApp;
