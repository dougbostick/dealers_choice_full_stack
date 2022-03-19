import React from "react";
import { render } from "react-dom";
// import axios from "axios";
import { connect, Provider } from "react-redux";
import store from "./store";
import { getCities } from "./store";

class CitiesList extends React.Component {
  async componentDidMount() {
    this.props.fetchCities();
  }
  render() {
    console.log("state", this.state);
    const citiesEls = this.props.cities.map((city) => {
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

const mapState = (reduxState) => {
  return {
    cities: reduxState.cities,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCities: () => dispatch(getCities()),
  };
};

const ConnectedCities = connect(mapState, mapDispatch)(CitiesList);
render(
  <Provider store={store}>
    <ConnectedCities />
  </Provider>,
  document.querySelector("#root")
);
