import React from "react";
import { render } from "react-dom";
import axios from "axios";
import { connect, Provider } from "react-redux";
import store from "./store";

class CitiesList extends React.Component {
  constructor() {
    super();
    this.state = {
      cities: [],
    };
  }
  async componentDidMount() {
    const response = await axios.get("/api/cities");
    const data = response.data;
    // console.log("data", data);
    this.setState({ cities: data });
  }
  render() {
    console.log("state", this.state);
    const citiesEls = this.state.cities.map((city) => {
      return <li key={city.id}>{city.name}</li>;
    });
    return (
      <div>
        <h1>Cities</h1>
        <ul>{citiesEls}</ul>
      </div>
    );
  }
}
const ConnectedCities = connect((state) => state, null)(CitiesList);
render(
  <Provider store={store}>
    <ConnectedCities />
  </Provider>,
  document.querySelector("#root")
);
