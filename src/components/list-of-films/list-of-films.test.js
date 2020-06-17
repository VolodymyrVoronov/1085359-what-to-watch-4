import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./list-of-films.jsx";

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

it(`render should be match markup`, () => {

  const result = renderer
    .create(<MoviesList
      films={MOVIES}
      onTitleClickHandler={HANDLE_CLICK}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
