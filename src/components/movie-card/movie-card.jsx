import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {Movie} from "../types-of-props.js";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
    this._handleFilmTitleClick = this._handleFilmTitleClick.bind(this);
  }

  _handleFilmCardHover() {
    const {film, onHover} = this.props;

    onHover({film});
  }

  _handleFilmTitleClick(e) {
    const {film, onClick} = this.props;

    e.preventDefault();
    onClick({film});
  }

  render() {
    const {film} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleFilmCardHover}
        onClick={this._handleFilmTitleClick}
      >
        <div className="small-movie-card__image">
          <img src={film.img} alt={film.title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={this._handleFilmTitleClick}>{film.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,

  film: Movie.isRequired,
};

export default MovieCard;
