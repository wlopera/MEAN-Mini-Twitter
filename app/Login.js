import React, { Component } from "react";
import update from "immutability-helper";
import APIInvoker from "./utils/APIInvoker";

var configuration = require("../config");
const info = configuration.log.infoMode;
const debug = false; //configuration.log.debugMode;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  HandlerInput = (e) => {
    let field = e.target.name;
    let value = e.target.value;

    if (debug) console.log(field, value, type);

    if (field === "username") {
      value = value.replace(" ", "").replace("@", "").substring(0, 15);
      this.setState(update(this.state, { [field]: { $set: value } }));
    } else {
      this.setState(update(this.state, { [field]: { $set: value } }));
    }
  };

  login = (e) => {
    e.preventDefault();

    let request = {
      username: this.state.username,
      password: this.state.password,
    };

    APIInvoker.invokePOST(
      "/login",
      request,
      (response) => {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("username", response.profile.userName);
        window.location = "/";
      },
      (error) => {
        console.log("Error en la autenticación");
        this.submitBtnLabel.innerHTML = error.message;
        this.submitBtnLabel.className = "shake animated";
      }
    );
  };

  render() {
    return (
      <div id="signup">
        <div className="container">
          <div className="row">
            <div className="col-xs-12"></div>
          </div>
        </div>
        <div className="signup-form">
          <form onSubmit={this.signup}>
            <h1>Iniciar sesión de Mini-Twitter</h1>
            <input
              type="text"
              value={this.state.username}
              placeholder="@usuario"
              name="username"
              id="username"
              onChange={this.HandlerInput}
            />
            <label id="usernameLabel" htmlFor="username" ref={(self) => (this.usernameLabel = self)} />

            <input
              type="password"
              value={this.state.password}
              placeholder="Contraseña"
              name="password"
              id="passwordLabel"
              onChange={this.HandlerInput}
            />
            <label htmlFor="passwordLabel" ref={(self) => (this.passwordLabel = self)} />

            <button className="btn btn-primary btn-lg" id="submitBtn" onClick={this.login}>
              Regístrarse
            </button>
            <label
              id="submitBtnLabel"
              htmlFor="submitBtn"
              ref={(self) => (this.submitBtnLabel = self)}
              className="snake animated hidden"
            ></label>
            <p className="bg-danger user-test">
              Crea un usuario o usa el usuario
              <strong>test/test</strong>
            </p>
            <p>¿No tienes cuenta? Registrate</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
