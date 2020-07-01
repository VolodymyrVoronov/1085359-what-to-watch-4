import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MoviesList from "../list-of-films/list-of-films.jsx";
import GenreFilter from "../genre-filter/genre-filter.jsx";

import {ALL_GENRE, GENRES, GENRE_ALIASES} from "../const.js";

import {Movies} from "../types-of-props.js";

class Catalog extends PureComponent {

  _getGenres() {
    const {films} = this.props;
    const genres = [ALL_GENRE];

    films.forEach((currentFilm) => {
      currentFilm.genres.forEach((genre) => {

        const alias = GENRE_ALIASES[genre] || genre;

        if (genres.includes(alias)) {
          return;
        }
        genres.push(alias);
      });
    });

    return genres;
  }

  _getCurrentFilms() {
    const {genreFilterIndex, films} = this.props;
    const genre = GENRES[genreFilterIndex - 1];

    // console.log(genreFilterIndex);
    // console.log(films);
    // console.log(GENRES);
    // console.log(genre);

    return genre ? films.filter((currentFilm) => currentFilm.genres.includes(genre)) : films;
  }

  render() {
    const {onMovieListItemClick} = this.props;
    const currentFilms = this._getCurrentFilms();
    // console.log(currentFilms);

    return (
      <React.Fragment>
        <GenreFilter
          genres={this._getGenres()}
        />
        <MoviesList
          films={currentFilms}
          onMovieListItemClick={onMovieListItemClick}
        />
        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </React.Fragment>
    );
  }
}

Catalog.propTypes = {
  onMovieListItemClick: PropTypes.func.isRequired,
  genreFilterIndex: PropTypes.number,

  films: Movies.isRequired,
};

Catalog.defaultProps = {
  films: [],
};

function mapStateToProps(state) {
  return {
    genreFilterIndex: state.genreFilterIndex,
  };
}

export {Catalog};
export default connect(mapStateToProps)(Catalog);
