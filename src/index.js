import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ConnectedCities } from "./CitiesList";

render(
  <Provider store={store}>
    <ConnectedCities />
  </Provider>,
  document.querySelector("#root")
);
