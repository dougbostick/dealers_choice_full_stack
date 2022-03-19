import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

export const getCities = () => {
  return async () => {
    try {
      const response = await axios.get("/api/cities");
      const data = response.data;
      //console.log("thunk response", data);
      store.dispatch({ type: "CITIES", cities: data });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = { cities: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CITIES":
      state = { cities: action.cities };
      //   console.log("store state", state);
      return state;
    case "ADD_CITY":
      console.log("state before splat", state);
      state = { cities: [...state.cities, action.city] };
      return state;
  }
  return state;
};
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
