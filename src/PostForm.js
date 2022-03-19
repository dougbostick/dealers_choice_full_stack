import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import store from "./store";

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
    const response = await axios.post("/api/cities", {
      name: this.state.name,
    });
    const city = response.data;
    store.dispatch({ type: "ADD_CITY", city });
    this.setState({ name: "" });
  }

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.create}>
        <input
          value={name}
          onChange={(ev) => this.setState({ name: ev.target.value })}
        />
        <button>Submit</button>
      </form>
    );
  }
}

const mapState = (reduxState) => reduxState;

export const ConnectedPost = connect(mapState)(PostForm);
