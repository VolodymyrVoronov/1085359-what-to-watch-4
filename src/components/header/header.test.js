import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";

const userInfo = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatarUrl: `https://instaturbo.ru/images/blog/5bbe622defe22.jpg`,
};

it(`ErrorMessage should render correctly`, () => {
  const result = renderer
    .create(<Header
      authorizationStatus={`AUTH`}
      authInfo={userInfo}
      onSignInClick={() => {}}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
