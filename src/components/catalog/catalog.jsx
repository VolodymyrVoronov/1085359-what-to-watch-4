import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import FilmsList from "../list-of-films/list-of-films.jsx";
import GenreFilterList from "../genre-filter-list/genre-filter-list.jsx";
import BtnShowMore from "../btn-show-more/btn-show-more.jsx";

import {Movies} from "../types-of-props.js";

class Catalog extends PureComponent {

  render() {
    const {onFilmListItemClick, genres, currentGenre, films, hasMoreFilms, onShowMore} = this.props;

    return (
      <React.Fragment>
        <GenreFilterList
          genres={genres}
          currentGenre={currentGenre}
        />
        <FilmsList
          films={films}
          onFilmListItemClick={onFilmListItemClick}
        />
        {hasMoreFilms && <BtnShowMore onClick={onShowMore} />}
      </React.Fragment>
    );
  }
}

Catalog.propTypes = {
  onFilmListItemClick: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,

  films: Movies.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  hasMoreFilms: PropTypes.bool.isRequired,
};

Catalog.defaultProps = {
  films: [],
};

const mapStateToProps = (state) => {
  return {
    genres: state.catalogGenres,
    currentGenre: state.catalogGenre,
    films: state.catalogFilms,
    hasMoreFilms: state.hasMoreСatalogFilms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowMore: () => {
      dispatch(ActionCreator.getMoreCatalogFilms());
    },
  };
};

export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
