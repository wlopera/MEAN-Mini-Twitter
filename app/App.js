import React, { Component } from "react";
import { render } from "react-dom";
import TweetsContainer from "./TweetsContainer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <TweetsContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
