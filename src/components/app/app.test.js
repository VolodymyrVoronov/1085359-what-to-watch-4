import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      title={Movie.TITLE}
      genre={Movie.GENRE}
      releaseDate={Movie.RELEASE_DATE}
      movieNames = {FILM_NAMES}
      onTitleClickHandler={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
