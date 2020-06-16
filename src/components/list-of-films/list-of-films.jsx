import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      target: undefined,
    };

    this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
  }

  _handleFilmCardHover({film}) {
    this.setState(() => {
      return {
        target: film,
      };
    });
  }

  render() {
    const {films, onTitleClickHandler} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film) => {
            return (
              <MovieCard
                key={film.title + film.id}
                film={film}
                onHover={this._handleFilmCardHover}
                onTitleClickHandler={onTitleClickHandler}
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

  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  })).isRequired,
};

export default MoviesList;
