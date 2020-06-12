import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

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

ReactDOM.render(
    <App
      title={Movie.TITLE}
      genre={Movie.GENRE}
      releaseDate={Movie.RELEASE_DATE}
      movieNames = {FILM_NAMES}
    />,
    document.querySelector(`#root`)
);
