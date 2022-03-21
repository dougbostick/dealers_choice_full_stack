import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ConnectedCities } from "./CitiesList";
import { HashRouter as Router, Route } from "react-router-dom";
import { ConnectedDetails } from "./Details";

render(
  <Provider store={store}>
    <Router>
      <Route path="/details/:id" component={ConnectedDetails} />
      <Route exact path="/" component={ConnectedCities} />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
