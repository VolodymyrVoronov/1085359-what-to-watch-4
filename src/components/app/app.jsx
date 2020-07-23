import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";
import FullPlayer from "../full-player/full-player.jsx";

import {Movies, Movie} from "../types-of-props.js";

import withActiveTab from "../../hocs/with-active-tab.jsx";
import withFullPlayer from "../../hocs/with-active-full-player.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);
const FullPlayerWrapped = withFullPlayer(FullPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderState() {
    const {films, extraInfoFilm, currentFilm, promoFilm, isFullScreenOn, handleMovieCardClick, handlePlayButtonClick, handleExitButtonClick} = this.props;
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
          film={extraInfoFilm}
          onExitButtonClick={handleExitButtonClick}
        />
      );
    }

    return (
      <Main
        film={extraInfoFilm}
        onFilmListItemClick={handleMovieCardClick}
        onPlayButtonClick={handlePlayButtonClick}
      />
    );
  }

  render() {
    const {films, extraInfoFilm, handlePlayButtonClick, handleExitButtonClick} = this.props;

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

          <Route exact path="/full-player">
            <FullPlayerWrapped
              film={extraInfoFilm}
              onExitButtonClick={handleExitButtonClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: Movies.isRequired,
  extraInfoFilm: Movie.isRequired,

  handleMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  extraInfoFilm: state.extraInfoFilm,
  isFullScreenOn: state.isFullScreenOn,
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
