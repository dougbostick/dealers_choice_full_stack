import React from "react";
import { connect } from "react-redux";
import { getCities } from "./store";
import { ConnectedPost } from "./PostForm";

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
        <ConnectedPost />
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

export const ConnectedCities = connect(mapState, mapDispatch)(CitiesList);
