import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`movie card title should be clicked`, () => {
  const onTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        currentMovie={CURRENT_MOVIE}
        films={MOVIES}
        onTitleClickHandler={onTitleClickHandler}
      />
  );

  const titleOfTheFilms = main.find(`a.small-movie-card__link`);

  titleOfTheFilms.forEach((element) => {
    element.props().onClick();
  });

  expect(onTitleClickHandler).toHaveBeenCalledTimes(titleOfTheFilms.length);
});
