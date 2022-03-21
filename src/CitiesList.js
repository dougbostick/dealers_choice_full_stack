import React from "react";
import { connect } from "react-redux";
import { getCities, deleteCity } from "./store";
import { ConnectedPost } from "./PostForm";
import { Link, Route } from "react-router-dom";

class CitiesList extends React.Component {
  async componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchCities();
    }
  }

  render() {
    console.log("state", this.state);
    const citiesEls = this.props.cities.map((city) => {
      return (
        <li key={city.id}>
          <Link to={`/details/${city.id}`}> {city.name} </Link>
          <button onClick={() => this.props.deleteCity(city.id)}>x</button>
        </li>
      );
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
    loaded: reduxState.loaded,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCities: () => dispatch(getCities()),
    deleteCity: (id) => dispatch(deleteCity(id)),
  };
};

export const ConnectedCities = connect(mapState, mapDispatch)(CitiesList);
