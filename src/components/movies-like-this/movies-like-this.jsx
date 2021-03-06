import React from "react";
import PropTypes from "prop-types";

import {Movie, Movies} from "../types-of-props.js";

import {AppPages} from "../const.js";
import history from "../../history.js";

const AMOUNT_OF_MOVIES_LIKE_THIS = 4;

const MoviesLikeThis = (props) => {

  const {film, films, onFilmListItemClick} = props;
  const currentGenre = film.genre;

  let filmsLikeThis = films.filter((filmItem) => filmItem.genre === currentGenre).slice(0, AMOUNT_OF_MOVIES_LIKE_THIS);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__movies-list">
        {
          filmsLikeThis.map((filmItem, idnex) => {
            return (
              <article key={idnex} className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image"
                  onClick={(e) => {
                    e.preventDefault();
                    onFilmListItemClick(filmItem);
                    history.push(`${AppPages.FILM}/${filmItem.id}`);
                  }}
                >
                  <img src={filmItem.poster} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onFilmListItemClick(filmItem);
                      history.push(`${AppPages.FILM}/${filmItem.id}`);
                    }}
                    className="small-movie-card__link" href="movie-page.html">{filmItem.title}</a>
                </h3>
              </article>
            );
          })
        }
      </div>
    </section>
  );
};

MoviesLikeThis.propTypes = {
  film: Movie.isRequired,
  films: Movies.isRequired,

  onFilmListItemClick: PropTypes.func,
};

export default MoviesLikeThis;
