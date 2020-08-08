import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films.jsx";
import GenreFilterList from "../genre-filter-list/genre-filter-list.jsx";
import BtnShowMore from "../btn-show-more/btn-show-more.jsx";

import {getShowFilms, hasMoreFilms} from "../../reducer/selectors.js";
import {getGenresFromFilms} from "../../reducer/data/selectors.js";
import {getGenre} from "../../reducer/app/selectors.js";

import {Movies} from "../types-of-props.js";

class Catalog extends PureComponent {

  render() {
    const {onFilmListItemClick, genres, currentGenre, films, hasMoreFilmsItem, onShowMore} = this.props;
    return (
      <React.Fragment>
        <GenreFilterList
          genres={genres}
          currentGenre={currentGenre}
        />
        <ListOfFilms
          films={films}
          onFilmListItemClick={onFilmListItemClick}
        />
        {hasMoreFilmsItem && <BtnShowMore onClick={onShowMore} />}
      </React.Fragment>
    );
  }
}

Catalog.propTypes = {
  onFilmListItemClick: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,

  films: Movies.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string,
  hasMoreFilmsItem: PropTypes.bool.isRequired,
};

Catalog.defaultProps = {
  films: [],
};

const mapStateToProps = (state) => {
  return {
    genres: getGenresFromFilms(state),
    currentGenre: getGenre(state),
    films: getShowFilms(state),
    hasMoreFilmsItem: hasMoreFilms(state)
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
