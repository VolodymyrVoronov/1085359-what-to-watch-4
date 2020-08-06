import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message.jsx";

it(`ErrorMessage should render correctly`, () => {
  const result = renderer
    .create(<ErrorMessage/>)
    .toJSON();

  expect(result).toMatchSnapshot();
});
