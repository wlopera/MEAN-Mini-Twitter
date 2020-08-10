import React, { Component } from "react";
import update from "immutability-helper";

class FormTest extends Component {
  state = {
    field: "Valor inicial",
  };

  updatedField = (event) => {
    this.setState(update(this.state, { field: { $set: event.target.value } }));
  };

  submitForm(event) {
    alert("field:" + this.state.field);
    alert("field2: " + event.target.field2.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.field} onChange={this.updatedField} />
        <form onSubmit={(event) => this.submitForm(event)}>
          <input type="text" name="field2" defaultValue="Valor final" />
          <br />
          <button type="submit">Presione</button>
        </form>
      </div>
    );
  }
}

export default FormTest;
