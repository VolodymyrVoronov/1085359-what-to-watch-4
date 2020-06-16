import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const CURRENT_MOVIE = {
  id: 0,
  title: `Citizen Kane`,
  genre: `Drama`,
  img: `img/bg-the-grand-budapest-hotel.jpg`,
  releaseDate: 2014
};

const HANDLE_CLICK = () => {};

it(`render should be match markup`, () => {

  const result = renderer
    .create(<MovieCard
      film={CURRENT_MOVIE}
      onHover={HANDLE_CLICK}
      onTitleClickHandler={HANDLE_CLICK}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
