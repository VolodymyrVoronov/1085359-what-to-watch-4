import React from "react";
import renderer from "react-test-renderer";
import Player from "./player.jsx";

const TEST_ITEMS = {
  ID: 0,
  IS_ACTIVE: false,
  POSTER: ``,
  SRC: ``,
};

const HANDLE_EVENT = () => {};

it(`render should be match markup`, () => {
  const result = renderer
    .create(<Player
      id={TEST_ITEMS.ID}
      isActive={TEST_ITEMS.IS_ACTIVE}
      onPlay={HANDLE_EVENT}
      onEnd={HANDLE_EVENT}
      poster={TEST_ITEMS.POSTER}
      src={TEST_ITEMS.SRC}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(result).toMatchSnapshot();
});
