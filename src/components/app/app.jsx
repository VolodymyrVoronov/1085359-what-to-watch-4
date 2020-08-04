import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Main from "../main/main.jsx";
import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";
import FullPlayer from "../full-player/full-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import ErrorMessage from "../error-message/error-message.jsx";

import {Movies, Movie} from "../types-of-props.js";

import {ActionCreator} from "../../reducer/app/app.js";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";

import {getPromoFilm, getFilms, getReviews, getIsError} from "../../reducer/data/selectors.js";
import {getCurrentFilmCard, getIsFullScreenOn} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import withActiveTab from "../../hocs/with-active-tab.jsx";
import withFullPlayer from "../../hocs/with-active-full-player.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);
const FullPlayerWrapped = withFullPlayer(FullPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderState() {
    const {films, extraInfoFilm, isFullScreenOn, handleMovieCardClick, handlePlayButtonClick, handleExitButtonClick, authInfo, authorizationStatus, login, onSignInClick, isSignedIn, isSignInError, isError} = this.props;

    if (isError) {
      return (
        <ErrorMessage />
      );
    }

    if (extraInfoFilm && !isFullScreenOn) {
      return (
        <MovieExtraInfoWrapped
          film={extraInfoFilm}
          films={films}
          onPlayButtonClick={handlePlayButtonClick}
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          isSignedIn={isSignedIn}
          onSignInClick={onSignInClick}
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

    if (isSignedIn) {
      return (
        <SignIn
          onSubmit={login}
          isSignInError={isSignInError}
        />
      );
    }

    return (
      <Main
        film={films[0]}
        onFilmListItemClick={handleMovieCardClick}
        onPlayButtonClick={handlePlayButtonClick}
        authInfo={authInfo}
        isSignedIn={isSignedIn}
        authorizationStatus={authorizationStatus}
        onSignInClick={onSignInClick}
      />
    );
  }

  render() {
    const {films, extraInfoFilm, handlePlayButtonClick, authorizationStatus, isSignedIn, authInfo, onSignInClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderState()}
          </Route>

          <Route exact path="/movie-detail-info">
            <MovieExtraInfoWrapped
              film={extraInfoFilm}
              films={films}
              onPlayButtonClick={handlePlayButtonClick}
              authInfo={authInfo}
              authorizationStatus={authorizationStatus}
              isSignedIn={isSignedIn}
              onSignInClick={onSignInClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: Movies.isRequired,
  extraInfoFilm: Movie,

  handleMovieCardClick: PropTypes.func.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
  handleExitButtonClick: PropTypes.func.isRequired,
  isFullScreenOn: PropTypes.bool.isRequired,

  isError: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  authInfo: PropTypes.object.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  isSignInError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromoFilm(state),
  reviews: getReviews(state),
  extraInfoFilm: getCurrentFilmCard(state),
  isFullScreenOn: getIsFullScreenOn(state),

  isError: getIsError(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  isSignedIn: getIsSignedIn(state),
  isSignInError: getIsSignInError(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieCardClick(film) {
    dispatch(ActionCreator.getFilmCard(film));
    dispatch(DataOperation.loadReviews(film.id));
  },
  handlePlayButtonClick() {
    dispatch(ActionCreator.toggleFullScreenPlayer(true));
  },
  handleExitButtonClick() {
    dispatch(ActionCreator.toggleFullScreenPlayer(false));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn(true));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
