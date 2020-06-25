import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Player from "../player/player.jsx";

import {Movie} from "../types-of-props.js";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
    this._handleFilmTitleClick = this._handleFilmTitleClick.bind(this);

    this._handleFilmCardLeave = this._handleFilmCardLeave.bind(this);
  }

  _handleFilmCardHover() {
    const {film, onHover} = this.props;

    onHover({film});
  }

  _handleFilmCardLeave() {
    const {film, onLeave} = this.props;

    onLeave({film});
  }

  _handleFilmTitleClick(e) {
    const {film, onClick} = this.props;

    e.preventDefault();
    onClick({film});
  }

  render() {
    const {id, film, isPreviewActive} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleFilmCardHover}
        onClick={this._handleFilmTitleClick}
        onMouseLeave={this._handleFilmCardLeave}
      >
        <div className="small-movie-card__image">
          <Player
            id={id}
            isActive={isPreviewActive}
            onPlay={() => {}}
            onEnd={() => {}}
            poster={film.poster}
            src={film.preview}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={this._handleFilmTitleClick}>{film.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  isPreviewActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,

  id: PropTypes.number.isRequired,
  film: Movie.isRequired,
};

export default MovieCard;
