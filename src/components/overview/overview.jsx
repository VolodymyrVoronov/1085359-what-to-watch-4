import React from "react";

import {Movie} from "../types-of-props.js";

const RATING_LEVELS = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const NUMBERS_OF_RATING = {
  BAD_0: 0,
  BAD_3: 3,

  NORMAL_3: 3,
  NORMAL_5: 5,

  GOOD_5: 5,
  GOOD_8: 8,

  VERY_GOOD_8: 8,
  VERY_GOOD_10: 10,

  AWESOME_10: 10
};

const getRating = (points) => {
  let rating;
  if (points <= NUMBERS_OF_RATING.BAD_0 || points <= NUMBERS_OF_RATING.BAD_3) {
    rating = RATING_LEVELS.BAD;
  }
  if (points <= NUMBERS_OF_RATING.NORMAL_3 || points <= NUMBERS_OF_RATING.NORMAL_5) {
    rating = RATING_LEVELS.NORMAL;
  }
  if (points <= NUMBERS_OF_RATING.GOOD_5 || points <= NUMBERS_OF_RATING.GOOD_8) {
    rating = RATING_LEVELS.GOOD;
  }
  if (points <= NUMBERS_OF_RATING.VERY_GOOD_8 || points <= NUMBERS_OF_RATING.VERY_GOOD_10) {
    rating = RATING_LEVELS.VERY_GOOD;
  }
  if (points >= NUMBERS_OF_RATING.AWESOME_10) {
    rating = RATING_LEVELS.AWESOME;
  }
  return rating;
};

const Overview = (porps) => {

  const {film} = porps;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{film.rating.score}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRating(film.rating.score)}</span>
          <span className="movie-rating__count">{`${film.rating.count} ratings`}</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{film.description}</p>
        <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {film.actors.join(`, `)}</strong></p>
      </div>
    </React.Fragment>
  );
};

Overview.propTypes = {
  film: Movie.isRequired,
};

export default Overview;
