import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`ErrorMessage should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <ErrorMessage/>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
