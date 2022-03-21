import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCities } from "./store";

export class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      city: null,
    };
  }
  async componentDidMount() {
    if (!this.props.loaded) {
      await this.props.fetchCities();
    }
    const city = this.props.cities.find(
      (city) => city.id === parseInt(this.props.match.params.id)
    );
    this.setState({ city });
  }
  render() {
    const { city } = this.state;
    console.log("DETAILS", this.state);
    return (
      <div>
        {city ? (
          <div>
            <h1>City Details: {city.name}</h1>
            <div>Country: {city.country || "unknown"}</div>
            <div>Population: {city.population || "beats me"}</div>
          </div>
        ) : (
          <h1> City not Found</h1>
        )}
        <Link to="/">Back to Home</Link>
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
  };
};

export const ConnectedDetails = connect(mapState, mapDispatch)(Details);
