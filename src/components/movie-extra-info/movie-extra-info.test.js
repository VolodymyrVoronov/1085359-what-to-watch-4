import React from "react";
import renderer from "react-test-renderer";
import MovieExtraInfo from "./movie-extra-info.jsx";

const CURRENT_MOVIE = {
  id: 0,
  title: `Citizen Kane`,
  genre: `Drama`,
  img: `img/bg-the-grand-budapest-hotel.jpg`,
  releaseDate: 2014,

  poster: `img/bg-the-grand-budapest-hotel.jpg`,
  rating: 7.8,
  ratingReviewsCount: 10,
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
  story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
  director: `Director`,
  actors: [
    `Actor 1`,
    `Actor 2`,
    `Actor 3`,
    `Actor 4`,
    `Actor 5`,
  ],
  runTime: 200,
};

const HANDLE_CLICK = () => {};

it(`render should be match markup`, () => {

  const result = renderer
    .create(<MovieExtraInfo
      film={CURRENT_MOVIE}
      onClick={HANDLE_CLICK}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
