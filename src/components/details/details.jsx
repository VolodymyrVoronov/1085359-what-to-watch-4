import React from "react";
import PropTypes from "prop-types";

import MoviesLikeThis from "../movies-like-this/movies-like-this.jsx";

import {Movie, Movies} from "../types-of-props.js";

const getFilmDuration = (duration) => {
  const hours = duration / 60 ^ 0;
  if (hours) {
    let minutes = duration % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h ${minutes}m`;
  } else {
    return `${duration}m`;
  }
};

const Details = (props) => {

  const {film, films, onFilmListItemClick} = props;
  const {actors} = film;

  return (
    <React.Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{film.director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {
                actors.map((actor, index) => {
                  return (
                    <React.Fragment key={actor}>
                      {actor}{index < actors.length - 1 && <>, <br /></>}
                    </React.Fragment>
                  );
                })
              }
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{getFilmDuration(film.runtime)}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{film.genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{film.releaseDate}</span>
          </p>
        </div>
      </div>

      <MoviesLikeThis
        onFilmListItemClick={onFilmListItemClick}
        films={films}
        film={film}
      />

    </React.Fragment>
  );
};

Details.propTypes = {
  film: Movie.isRequired,
  films: Movies.isRequired,

  onFilmListItemClick: PropTypes.func,
};

export default Details;
