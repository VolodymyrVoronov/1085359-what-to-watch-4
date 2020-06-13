import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const Movie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const FILM_NAMES = [
  `Citizen Kane`,
  `Casablanka`,
  `The Godfather`,
  `Gone With The Wind`,
  `Lawrence Of Arabia`,
  `The Wizard Of Oz`,
  `The Graduate`,
  `On The Waterfront`,
  `Schindler's List`,
  `Singing' In The Rain`,
  `It's A Wonderful Life`,
  `Sunset Blvd.`,
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should main title of the movie be clicked`, () => {
  const onTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        title={Movie.TITLE}
        genre={Movie.GENRE}
        releaseDate={Movie.RELEASE_DATE}
        movieNames = {FILM_NAMES}
        onTitleClickHandler={onTitleClickHandler}
      />
  );

  const titleOfTheFilms = main.find(`a.small-movie-card__link`);

  titleOfTheFilms.forEach((element) => {
    element.props().onClick();
  });

  expect(onTitleClickHandler.mock.calls.length).toBe(titleOfTheFilms.length);
});
