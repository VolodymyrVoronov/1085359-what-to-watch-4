import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";
import FullPlayer from "../full-player/full-player.jsx";

import {Movies, Movie} from "../types-of-props.js";

import {getPromoFilm, getFilms} from "../../reducer/data/selectors.js";
import {getShownFilmCards, getCurrentFilmCard, getIsFullScreenOn} from "../../reducer/app/selectors.js";

import withActiveTab from "../../hocs/with-active-tab.jsx";
import withFullPlayer from "../../hocs/with-active-full-player.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);
const FullPlayerWrapped = withFullPlayer(FullPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderState() {
    const {films, extraInfoFilm, isFullScreenOn, handleMovieCardClick, handlePlayButtonClick, handleExitButtonClick} = this.props;

    console.log(films);
    console.log(extraInfoFilm);

    if (extraInfoFilm && !isFullScreenOn) {
      return (
        <MovieExtraInfoWrapped
          film={extraInfoFilm}
          films={films}
          onPlayButtonClick={handlePlayButtonClick}
        />
      );
    }

    if (isFullScreenOn) {
      return (
        <FullPlayerWrapped
          film={films[0]}
          onExitButtonClick={handleExitButtonClick}
        />
      );
    }

    return (
      <Main
        film={films[0]}
        onFilmListItemClick={handleMovieCardClick}
        onPlayButtonClick={handlePlayButtonClick}
      />
    );
  }

  render() {
    const {films, extraInfoFilm, handlePlayButtonClick} = this.props;

    console.log(films);
    console.log(extraInfoFilm);

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderState()}
          </Route>

          <Route exact path="/movie-detail-info">
            <MovieExtraInfoWrapped
              films={films}
              film={extraInfoFilm}
              onPlayButtonClick={handlePlayButtonClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // films: Movies.isRequired,
  // extraInfoFilm: Movie,

  handleMovieCardClick: PropTypes.func.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
  handleExitButtonClick: PropTypes.func.isRequired,
  // isFullScreenOn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromoFilm(state),
  extraInfoFilm: getCurrentFilmCard(state),
  isFullScreenOn: getIsFullScreenOn(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieCardClick(film) {
    dispatch(ActionCreator.getFilmCard(film));
  },
  handlePlayButtonClick() {
    dispatch(ActionCreator.toggleFullScreenPlayer(true));
  },
  handleExitButtonClick() {
    dispatch(ActionCreator.toggleFullScreenPlayer(false));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
