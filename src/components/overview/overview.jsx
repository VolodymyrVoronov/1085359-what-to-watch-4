import React, {PureComponent} from "react";

import {Movie} from "../types-of-props.js";

const RATING_LEVELS = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  COOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getRating = (points) => {
  let rating;
  if (points <= 0 || points <= 3) {
    rating = RATING_LEVELS.BAD;
  }
  if (points <= 3 || points <= 5) {
    rating = RATING_LEVELS.NORMAL;
  }
  if (points <= 5 || points <= 8) {
    rating = RATING_LEVELS.COOD;
  }
  if (points <= 8 || points <= 10) {
    rating = RATING_LEVELS.VERY_GOOD;
  }
  if (points >= 10) {
    rating = RATING_LEVELS.AWESOME;
  }
  return rating;
};

class Overview extends PureComponent {
  render() {
    const {film} = this.props;

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
  }
}

Overview.propTypes = {
  film: Movie.isRequired,
};

export default Overview;
