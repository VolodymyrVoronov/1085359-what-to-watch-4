import React, {PureComponent} from "react";
import PropTypes from "prop-types";

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
    const {film, onTitleClickHandler} = this.props;

    e.preventDefault();
    onTitleClickHandler({film});
  }

  render() {
    const {film} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card" onMouseEnter={this._handleFilmCardHover}>
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
  onTitleClickHandler: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,

  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  })
};

export default MovieCard;
