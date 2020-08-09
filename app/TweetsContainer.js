import React, { Component } from "react";
import APIInvoker from "./utils/APIInvoker";
import PropTypes from "prop-types";

var configuration = require("../config");
let info = configuration.log.infoMode;

class TweetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
    let username = this.props.profile.userName;
    let onlyUserTweet = this.props.onlyUserTweet;
    this.loadTweets(username, onlyUserTweet);
  }

  loadTweets = (username, onlyUserTweet) => {
    let url = "/tweets" + (onlyUserTweet ? "/" + username : "");
    console.log("url: ", url);
    APIInvoker.invokeGET(
      url,
      (response) => {
        this.setState({ tweets: response.body });
      },
      (error) => {
        console.log("Error al cargar los Tweets", error);
      }
    );
  };

  render() {
    if (info) {
      console.log("Tweets: ", this.state.tweets);
    }
    return (
      <main className="twitter-panel">
        <If condition={this.state.tweets != null}>
          <For each="tweet" of={this.state.tweets}>
            <p key={tweet._id}>
              {tweet._creator.userName}:{tweet._id}-{tweet.message}
            </p>
          </For>
        </If>
      </main>
    );
  }
}

TweetsContainer.propTypes = {
  onlyUserTweet: PropTypes.bool,
  profile: PropTypes.object,
};
TweetsContainer.defaultProps = {
  onlyUserTweet: false,
  profile: {
    userName: "",
  },
};

export default TweetsContainer;
