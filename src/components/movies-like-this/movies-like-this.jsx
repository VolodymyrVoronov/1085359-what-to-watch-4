import React, {PureComponent} from "react";

import {Movie, Movies} from "../types-of-props.js";

const AMOUNT_OF_MOVIES_LIKE_THIS = 4;

class MoviesLikeThis extends PureComponent {

  render() {

    const {film, films} = this.props;
    const currentGenre = film.genre;

    let filmsLikeThis = films.filter((film) => film.genre === currentGenre).slice(0, AMOUNT_OF_MOVIES_LIKE_THIS);

    return (
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {
            filmsLikeThis.map((film, idnex) => {
              return (
                <article key={idnex} className="small-movie-card catalog__movies-card">
                  <div className="small-movie-card__image">
                    <img src={film.img} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
                  </div>
                  <h3 className="small-movie-card__title">
                    <a className="small-movie-card__link" href="movie-page.html">{film.title}</a>
                  </h3>
                </article>
              );
            })
          }
        </div>
      </section>
    );
  }
}

MoviesLikeThis.propTypes = {
  film: Movie.isRequired,
  films: Movies.isRequired,
};

export default MoviesLikeThis;
