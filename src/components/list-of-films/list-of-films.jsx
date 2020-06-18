import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

import {Movies} from "../types-of-props.js";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      target: undefined,
    };

    this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
  }

  _handleFilmCardHover({film}) {
    this.setState(() => {
      return {
        target: film,
      };
    });
  }

  _handleFilmCardClick({film}) {
    const {onTitleClickHandler} = this.props;

    onTitleClickHandler({film});
  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film) => {
            return (
              <MovieCard
                key={film.title + film.id}
                film={film}
                onHover={this._handleFilmCardHover}
                onClick={this._handleFilmCardClick}
              />
            );
          })
        }
      </div>
    );
  }
}

MoviesList.propTypes = {
  onTitleClickHandler: PropTypes.func.isRequired,

  films: Movies.isRequired,
};

export default MoviesList;
