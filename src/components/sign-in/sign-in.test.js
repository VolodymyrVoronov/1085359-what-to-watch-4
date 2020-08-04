import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`SignInScreen should render correctly`, () => {
  const tree = renderer.create(
      <SignIn
        onSubmit={() => {}}
        isSignInError={false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
