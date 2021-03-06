import React from "react";
import renderer from "react-test-renderer";
import Loader from "./loader.jsx";

it(`Loader should render correctly`, () => {
  const tree = renderer
    .create(<Loader
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
