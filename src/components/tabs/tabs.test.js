import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

const ACTIVE_TAB = 0;
const CURRENT_TAB = 0;
const HANDLE_CLICK = () => {};

it(`render should be match markup`, () => {

  const result = renderer
    .create(<Tabs
      currentTab={CURRENT_TAB}
      activeTab={ACTIVE_TAB}
      onTabClick={HANDLE_CLICK}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
