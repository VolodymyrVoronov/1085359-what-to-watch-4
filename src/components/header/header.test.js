import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const userInfo = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatarUrl: `https://instaturbo.ru/images/blog/5bbe622defe22.jpg`,
};

it(`Header should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            authorizationStatus={`AUTH`}
            authInfo={userInfo}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

