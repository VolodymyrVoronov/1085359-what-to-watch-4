import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

import {Movies} from "../types-of-props.js";

import withActiveItemList from "../../hocs/with-active-item-list.jsx";

const PRVIEW_DALAY = 1000;

const MovieCardWrapped = withActiveItemList(MovieCard, PRVIEW_DALAY);

class FilmsList extends PureComponent {

  render() {
    const {films, activeItemId, onItemHover, onItemLeave, onFilmListItemClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film, index) => {
            return (
              <MovieCardWrapped
                id={index}
                key={film.title + index}
                film={film}
                isPreviewActive={activeItemId}
                onHover={onItemHover}
                onLeave={onItemLeave}
                onClick={onFilmListItemClick}
              />
            );
          })
        }
      </div>
    );
  }
}

FilmsList.propTypes = {
  onFilmListItemClick: PropTypes.func.isRequired,
  onItemHover: PropTypes.func.isRequired,
  onItemLeave: PropTypes.func.isRequired,
  activeItemId: PropTypes.bool.isRequired,

  films: Movies.isRequired,
};

export default FilmsList;
