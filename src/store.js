import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

export const getCities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/cities");
      const data = response.data;
      store.dispatch({ type: "CITIES", cities: data });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = { cities: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CITIES": {
      state = { cities: action.cities };
      return state;
    }
  }
  return state;
};
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
