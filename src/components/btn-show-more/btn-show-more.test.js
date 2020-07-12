import React from "react";
import renderer from "react-test-renderer";

import BtnShowMore from "./btn-show-more.jsx";

const HANDLE_CLICK = () => {};

it(`render should be match markup`, () => {

  const result = renderer
    .create(<BtnShowMore onClick={HANDLE_CLICK} />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
