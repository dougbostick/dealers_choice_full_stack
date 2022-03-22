import React from "react";
import { connect } from "react-redux";
import { addCity } from "./store";

export class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    this.create = this.create.bind(this);
  }

  async create(ev) {
    ev.preventDefault();
    this.props.addCity(this.state.name);
    this.setState({ name: "" });
  }

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.create}>
        <input
          placeholder="input city"
          value={name}
          onChange={(ev) => this.setState({ name: ev.target.value })}
        />
        <button className="submit">Submit</button>
      </form>
    );
  }
}

//const mapState = (reduxState) => reduxState;
const mapDispatch = (dispatch) => {
  return {
    addCity: (name) => dispatch(addCity(name)),
  };
};

export const ConnectedPost = connect(null, mapDispatch)(PostForm);
