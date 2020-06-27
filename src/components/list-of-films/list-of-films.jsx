import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

import {Movies} from "../types-of-props.js";

const PRVIEW_DALAY = 1000;

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this._timeoutId = undefined;
    this.state = {
      target: undefined,
    };

    this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);

    this._handleFilmCardLeave = this._handleFilmCardLeave.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this._timeoutId);
  }

  _handleFilmCardHover({film}) {
    clearTimeout(this._timeoutId);
    this._timeoutId = setTimeout(() => this.setState(() => { 
      return {
        target: film,
      };
    }), PRVIEW_DALAY);
  }

  _handleFilmCardLeave({_film}) {
    clearTimeout(this._timeoutId);
    this.setState(() => {
      return {
        target: undefined,
      };
    });
  }

  _handleFilmCardClick({film}) {
    const {onTitleClickHandler} = this.props;

    onTitleClickHandler({film});
  }

  render() {
    const {target} = this.state;
    const {films} = this.props;
    
    return (
      <div className="catalog__movies-list">
        {
          films.map((film, index) => {
            return (
              <MovieCard
                key={film.title + film.id}
                id={index}
                film={film}
                isPreviewActive={target === film}
                onHover={this._handleFilmCardHover}
                onClick={this._handleFilmCardClick}
                onLeave={this._handleFilmCardLeave}
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
