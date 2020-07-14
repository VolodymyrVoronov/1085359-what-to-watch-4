import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Player from "../player/player.jsx";

import {Movie} from "../types-of-props.js";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
    this._handleFilmCardLeave = this._handleFilmCardLeave.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
  }

  _handleFilmCardHover() {
    const {film, onHover} = this.props;

    onHover({film});
  }

  _handleFilmCardLeave() {
    const {film, onLeave} = this.props;

    onLeave({film});
  }

  _handleFilmCardClick(e) {
    const {film, onClick} = this.props;

    e.preventDefault();
    onClick({film});
  }

  render() {
    const {id, film, isPreviewActive} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleFilmCardHover}
        onMouseLeave={this._handleFilmCardLeave}
        onClick={this._handleFilmCardClick}
      >
        <div className="small-movie-card__image">
          <Player
            id={id}
            isActive={isPreviewActive}
            poster={film.poster}
            src={film.preview}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={this._handleFilmCardClick}>{film.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  isPreviewActive: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,

  film: Movie.isRequired,
};

export default MovieCard;
