import React, { Component } from "react";
import { render } from "react-dom";
import TwitterApp from "./TwitterApp";
import { Router } from "react-router-dom";
import history from "./History";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <TwitterApp />
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
