import React from "react";
import update from "immutability-helper";
import config from "../config.js";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      message: "",
      image: null,
    };
  }

  handleMessageFocus = (e) => {
    let newSate = update(this.state, { focus: { $set: true } });
    this.setState(newSate);
  };

  handleChangeMessage = (e) => {
    this.setState(update(this.state, { message: { $set: e.target.value } }));
  };

  HandleKeyDown = (e) => {
    // Comando ESC
    if (e.keyCode === 27) {
      this.reset();
    }
  };

  handleMessageFocusLost = (e) => {
    if (this.state.message.length === 0) {
      this.reset();
    }
  };

  reset() {
    let newState = update(this.state, {
      focus: { $set: false },
      message: { $set: "" },
      image: { $set: null },
    });
    this.setState(newState);
    this.reply.blur();
  }

  imagenSelect = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file.size > 1240000) {
      alert("La imagen supera el máximo de 1MB");
      return;
    }

    console.log("file: ", file);
    let reader = new FileReader(file);

    reader.onloadend = () => {
      let newState = update(this.state, {
        image: { $set: reader.result },
      });
      this.setState(newState);
      console.log("reader.result: ", reader.result);
      console.log("state: ", this.state);
    };
    reader.readAsDataURL(file);
  };

  newTween = (e) => {
    e.preventDefault;

    let tween = {
      _id: uuidv4(),
      _creator: {
        _id: this.props.profile._id,
        name: this.props.profile.name,
        userName: this.props.profile.userName,
        avatar: this.props.profile.avatar,
      },
      date: Date.now,
      message: this.state.message,
      image: this.state.image,
      liked: false,
      likeCounter: 0,
    };
    console.log("tween: ", tween);
    this.props.operations.addNewTween(tween);
    this.reset();
  };

  render() {
    let randomID = uuidv4();

    return (
      <section className="reply">
        <If condition={this.props.profile != null}>
          <img src={this.props.profile.avatar} className="reply-avatar" />
        </If>
        <div className="reply-body">
          <textarea
            ref={(self) => (this.reply = self)}
            name="menssage"
            type="text"
            maxLength={config.tweets.maxTweetSize}
            placeholder="¿Qué esté pasando?"
            className={this.state.focus ? "reply-selected" : ""}
            value={this.state.message}
            onKeyDown={this.HandleKeyDown}
            onBlur={this.handleMessageFocusLost}
            onFocus={this.handleMessageFocus}
            onChange={this.handleChangeMessage}
          >
            <If condition={this.state.image != null}>
              <div className="image-box">
                <img src={this.state.image} />
              </div>
            </If>
          </textarea>
        </div>

        <div className={this.state.focus ? "reply-controls" : "hidden"}>
          <label
            htmlFor={"reply-camara-" + randomID}
            className={this.state.message.length === 0 ? "btn pull-left disabled" : "btn pull-left"}
          >
            <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
          </label>
          <input
            href="#"
            className={this.state.message.length === 0 ? "btn pull-left disabled" : "btn pull-left"}
            accept=".gif, .jpg, .jpeg, .png"
            type="file"
            onChange={this.imagenSelect}
            id={"reply-camara-" + randomID}
          />
          <span ref="charCouter" className="char-counter">
            {config.tweets.maxTweetSize - this.state.message.length}
          </span>
          <button
            className={this.state.message.length === 0 ? "btn btn-primary disabled" : "btn btn-primary"}
            onClick={this.newTween}
          >
            <i className="fa fa-twitch" aria-hidden="true"></i>
            Twittear
          </button>
        </div>
      </section>
    );
  }
}

Reply.propTypes = {
  profile: PropTypes.object,
  operations: PropTypes.object.isRequired,
};

export default Reply;
