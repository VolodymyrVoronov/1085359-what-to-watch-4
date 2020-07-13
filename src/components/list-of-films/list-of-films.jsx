import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

import {Movies} from "../types-of-props.js";

import withActiveItemList from "../../hocs/with-active-item-list.jsx";

const PRVIEW_DALAY = 1000;

const MovieCardWrapped = withActiveItemList(MovieCard, PRVIEW_DALAY);



class FilmsList extends PureComponent {
  // constructor(props) {
  //   super(props);

  //   this._timeoutId = undefined;
  //   this.state = {
  //     target: undefined,
  //   };

  //   this._handleFilmCardHover = this._handleFilmCardHover.bind(this);
  //   this._handleFilmCardClick = this._handleFilmCardClick.bind(this);

  //   this._handleFilmCardLeave = this._handleFilmCardLeave.bind(this);
  // }

  // componentWillUnmount() {
  //   clearTimeout(this._timeoutId);
  // }

  // _handleFilmCardHover({film}) {
  //   clearTimeout(this._timeoutId);
  //   this._timeoutId = setTimeout(() => this.setState(() => {
  //     return {
  //       target: film,
  //     };
  //   }), PRVIEW_DALAY);
  // }

  // _handleFilmCardLeave({_film}) {
  //   clearTimeout(this._timeoutId);
  //   this.setState(() => {
  //     return {
  //       target: undefined,
  //     };
  //   });
  // }

  // _handleFilmCardClick({film}) {
  //   const {onFilmListItemClick} = this.props;

  //   onFilmListItemClick({film});
  // }

  render() {
    // const {target} = this.state; 
    const {films, activeItemId, onItemHover, onItemLeave, onItemClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film, index) => {
            return (
              <MovieCardWrapped
                id={index}
                key={film.title + index}
                film={film}
                isPreviewActive={activeItemId === index}
                onHover={onItemHover}
                onLeave={onItemLeave}
                onClick={onItemClick}
              />
            );
          })
        }
      </div>
    );
  }
}

FilmsList.propTypes = {
  // onFilmListItemClick: PropTypes.func.isRequired,

  films: Movies.isRequired,
};

export default FilmsList;
