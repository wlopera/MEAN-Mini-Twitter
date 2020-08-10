import React, { Component } from "react";
import { render } from "react-dom";
import TweetsContainer from "./TweetsContainer";
import Signup from "./Signup";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <TweetsContainer /> */}
        {/* <Signup /> */}
        <Login />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
