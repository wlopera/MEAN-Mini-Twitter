import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";

class App_1 extends Component {
  render() {
    const variable = {
      sexo: "mujer",
      man: "Hombre",
      woman: "Mujer",
    };

    let isList = ["Oscar Blancarte", "Juan Perez", "Manuel Juarez", "Juan Castro"];

    let setList = isList.map((item) => {
      return <li>{item}</li>;
    });

    return (
      <div>
        <h2>{variable.sexo == "man" ? variable.man : variable.woman}</h2>
        <h1>Hola Venezuela!</h1>
        <button onClick={() => alert("Ventana de prueba")}>Presiona</button>
        <ul>{setList}</ul>
      </div>
    );
  }
}

ReactDOM.render(<App_1 />, document.getElementById("root"));
