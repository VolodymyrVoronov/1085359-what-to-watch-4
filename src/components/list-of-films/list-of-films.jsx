import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

import {Movies} from "../types-of-props.js";

import withActiveItemList from "../../hocs/with-active-item-list.jsx";

const PRVIEW_DALAY = 1000;

const MovieCardWrapped = withActiveItemList(MovieCard, PRVIEW_DALAY);

class ListOfFilms extends PureComponent {

  render() {
    const {films, onFilmListItemClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film, index) => {
            return (
              <MovieCardWrapped
                id={index}
                key={film.title + index}
                film={film}
                onFilmListItemClick={onFilmListItemClick}
              />
            );
          })
        }
      </div>
    );
  }
}

ListOfFilms.propTypes = {
  onFilmListItemClick: PropTypes.func.isRequired,

  films: Movies.isRequired,
};

export default ListOfFilms;
