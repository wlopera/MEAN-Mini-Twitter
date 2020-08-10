import React, { Component } from "react";
import update from "immutability-helper";
import APIInvoker from "./utils/APIInvoker";

var configuration = require("../config");
const info = configuration.log.infoMode;
const debug = false; //configuration.log.debugMode;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      userOk: false,
      license: false,
    };
  }

  HandlerInput = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    if (debug) console.log(field, value, type);

    if (field === "username") {
      value = value.replace(" ", "").replace("@", "").substring(0, 15);
      this.setState(update(this.state, { [field]: { $set: value } }));
    } else if (type === "checkbox") {
      this.setState(update(this.state, { [field]: { $set: e.target.checked } }));
    } else {
      this.setState(update(this.state, { [field]: { $set: value } }));
    }
  };

  validateUser = (e) => {
    let username = e.target.value;
    APIInvoker.invokeGET(
      "/usernameValidate/" + username,
      (respose) => {
        this.setState(
          update(this.state, {
            userOK: { $set: true },
          })
        );
        this.usernameLabel.innerHTML = respose.message;
        this.usernameLabel.className = "fadeIn animated ok";
      },
      (error) => {
        console.log("Error al consultar al usuario");
        this.setState(update(this.state, { userOk: { $set: false } }));
        this.usernameLabel.innerHTML = error.message;
        this.usernameLabel.className = "fadeIn animated fail";
      }
    );
  };

  signup = (e) => {
    e.preventDefault();
    if (!this.state.license) {
      this.submitBtnLabel.innerHTML = "Acepte los terminos de la licencia";
      this.submitBtnLabel.className = "shake animated";
      return;
    } else if (this.state.userOk) {
      this.submitBtnLabel.innerHTML = "Favor revizar su nombre de usuario";
      this.submitBtnLabel.className = "";
      return;
    }
    this.submitBtnLabel.innerHTML = "";
    this.submitBtnLabel.className = "";

    let request = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };

    APIInvoker.invokePOST(
      "/signup",
      request,
      (response) => {
        alert("Usuario registrado correctamente");
      },
      (error) => {
        console.log("Error al registrar usuario");
        this.submitBtnLabel.innerHTML = error.error;
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
            <h1>Unete a Mini-Twitter</h1>
            <input
              type="text"
              value={this.state.username}
              placeholder="@usuario"
              name="username"
              id="username"
              onChange={this.HandlerInput}
              onBlur={this.validateUser}
            />
            <label id="usernameLabel" htmlFor="username" ref={(self) => (this.usernameLabel = self)} />

            <input
              type="text"
              value={this.state.name}
              placeholder="Nombre"
              name="name"
              id="name"
              onChange={this.HandlerInput}
            />
            <label id="nameLabel" htmlFor="name" ref={(self) => (this.nameLabel = self)} />

            <input
              type="password"
              value={this.state.password}
              placeholder="Contraseña"
              name="password"
              id="passwordLabel"
              onChange={this.HandlerInput}
            />
            <label htmlFor="passwordLabel" ref={(self) => (this.passwordLabel = self)} />

            <input
              type="checkbox"
              value={this.state.license}
              ref={(self) => (this.license = self)}
              name="license"
              id="license"
              onChange={this.HandlerInput}
            />
            <label htmlFor="license"> Acepto los terminos de licencia</label>

            <button className="btn btn-primary btn-lg" id="submitBtn" onClick={this.signup}>
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
            <p>¿Ya tienes cuenta? Iniciar sesión</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
