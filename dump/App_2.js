import React, { Component } from "react";
import { render } from "react-dom";
import APIInvoker from "./utils/APIInvoker";

var configuration = require("../config");
const debug = configuration.log.infoMode;

class App_2 extends Component {
  state = {
    tweets: [],
  };

  componentWillMount() {
    APIInvoker.invokeGET(
      "/tweets",
      (response) => {
        this.setState({
          tweets: response.body,
        });
      },
      (error) => {
        console.log("Error al cargar los tweets: ", error);
      }
    );
  }

  render() {
    // let setTweets = this.state.tweets.map((tweet, key) => {
    //   return (
    //     <li key={tweet._id}>
    //       {tweet._creator.name}: {tweet.message}
    //     </li>
    //   );
    // });

    if (debug) {
      console.log("Tweets: ", this.state.tweets);
    }
    return (
      <div>
        <h1>Mini-Twitter</h1>
        <ul>
          <For each="tweet" of={this.state.tweets}>
            <li key={tweet._id}>
              {tweet._creator.name}: {tweet.message}
            </li>
          </For>
        </ul>
        {/* <ul>{setTweets}</ul> */}
      </div>
    );
  }
}

render(<App_2 />, document.getElementById("root"));
