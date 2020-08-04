import React from "react";
import PropTypes from "prop-types";

import GenreFilter from "./../genre-filter/genre-filter.jsx";

const GenreFilterList = ({genres, currentGenre}) => {
  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => {
          return (
            <li key={genre}
              className={`catalog__genres-item${genre === currentGenre ? ` catalog__genres-item--active` : ``}`}
            >
              <GenreFilter genre={genre} />
            </li>
          );
        })
      }
    </ul>
  );
};

GenreFilterList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string,
};

export default GenreFilterList;
