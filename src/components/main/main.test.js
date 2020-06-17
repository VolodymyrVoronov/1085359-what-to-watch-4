import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const CURRENT_MOVIE = {
  id: 0,
  title: `Citizen Kane`,
  genre: `Drama`,
  img: `img/bg-the-grand-budapest-hotel.jpg`,
  releaseDate: 2014
};

const MOVIES = [
  {
    id: 1,
    title: `Citizen Kane`,
    genre: `Drama`,
    img: `img/bg-the-grand-budapest-hotel.jpg`,
    releaseDate: 2014
  },

  {
    id: 2,
    title: `Casablanka`,
    genre: `Drama`,
    img: `img/bg-the-grand-budapest-hotel.jpg`,
    releaseDate: 2014
  },

  {
    id: 3,
    title: `The Godfather`,
    genre: `Drama`,
    img: `img/bg-the-grand-budapest-hotel.jpg`,
    releaseDate: 2014
  },
];

const HANDLE_CLICK = () => {};

it(`<Should Main render correctly`, () => {
  const result = renderer
    .create(<Main
      currentMovie={CURRENT_MOVIE}
      films={MOVIES}
      onTitleClickHandler={HANDLE_CLICK}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});