import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

export const getCities = () => {
  return async () => {
    try {
      const response = await axios.get("/api/cities");
      const data = response.data;
      console.log("thunk response", data);
      store.dispatch({ type: "CITIES", cities: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCity = (name) => {
  return async () => {
    try {
      const response = await axios.post("/api/cities", {
        name,
      });
      const city = response.data;
      store.dispatch({ type: "ADD_CITY", city });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCity = (cityId) => {
  return async () => {
    try {
      await axios.delete(`/api/cities/${cityId}`);
      store.dispatch({ type: "DELETE_CITY", id: cityId });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = { cities: [], loaded: false };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CITIES":
      state = { cities: action.cities, loaded: true };
      console.log("store state", state);
      return state;
    case "ADD_CITY":
      // console.log("state before splat", state);
      state = { cities: [...state.cities, action.city] };
      return state;
    case "DELETE_CITY":
      const filtered = state.cities.filter((city) => city.id !== action.id);
      state = { cities: filtered };
      return state;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
