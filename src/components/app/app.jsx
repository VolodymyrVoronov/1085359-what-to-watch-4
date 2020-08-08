import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Route, Switch, Redirect, Router} from "react-router-dom";

import Main from "../main/main.jsx";
import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";
import FullPlayer from "../full-player/full-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import Loader from "../loader/loader.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import AddReview from "../add-review/add-review.jsx";

import {Movies, Movie} from "../types-of-props.js";
import {AppPages} from "../const.js";
import history from "../../history.js";

import {ActionCreator} from "../../reducer/app/app.js";

import {getPromoFilm, getFilms, getReviews, getFavoriteFilms} from "../../reducer/data/selectors.js";
import {getCurrentFilmCard, getIsLoading} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignInError} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";

import withActiveTab from "../../hocs/with-active-tab.jsx";
import withFullPlayer from "../../hocs/with-active-full-player.jsx";
import withActiveCard from "../../hocs/with-active-card.jsx";
import withAddReview from "../../hocs/with-active-add-review.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);
const FullPlayerWrapped = withFullPlayer(FullPlayer);
const MyListWrapped = withActiveCard(MyList);
const AddReviewWrapped = withAddReview(AddReview);

const getCurrentFilm = (films, params) => {
  return films.find((film) => film.id === parseInt(params, 10));
};

const App = (props) => {
  const {films, promoFilm, onFilmListItemClick, authInfo, authorizationStatus, login, isSignInError, isLoading, addFilmToFavorites, favoriteFilms, onReviewSubmit} = props;

  if (films.length === 0) {
    return <Loader />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact path={AppPages.MAIN}
          render={() => {

            return (
              isLoading ? <Loader /> :
                <Main
                  film={films[0]}
                  promoMovie={promoFilm}
                  onFilmListItemClick={onFilmListItemClick}
                  authInfo={authInfo}
                  authorizationStatus={authorizationStatus}
                  addFilmToFavorites={addFilmToFavorites}
                />
            );
          }}
        />

        <Route
          exact path={AppPages.SIGN_IN}
          render={() => {

            return (
              authorizationStatus === AuthorizationStatus.AUTH ?
                <Redirect to={AppPages.MAIN} /> :
                <SignIn
                  onSubmit={login}
                  isSignInError={isSignInError}
                />
            );
          }}
        />

        <Route
          exact path={`${AppPages.FILM}/:id`}
          render={(routeProps) => {
            const сurrentFilm = getCurrentFilm(films, routeProps.match.params.id);

            return (
              isLoading ? <Loader /> :
                <MovieExtraInfoWrapped
                  routeProps={routeProps}
                  film={сurrentFilm}
                  films={films}
                  authInfo={authInfo}
                  authorizationStatus={authorizationStatus}
                  addFilmToFavorites={addFilmToFavorites}
                  onFilmListItemClick={onFilmListItemClick}
                />
            );
          }}
        />

        <Route
          exact path={`${AppPages.PLAYER}/:id/`}
          render={(routeProps) => {
            const сurrentFilm = getCurrentFilm(films, routeProps.match.params.id);

            return (
              isLoading ? <Loader /> :
                <FullPlayerWrapped
                  film={сurrentFilm ? сurrentFilm : promoFilm}
                />
            );
          }}
        />

        <PrivateRoute
          exact path={`${AppPages.FILM}/:id/review`}
          render={(routeProps) => {
            const сurrentFilm = getCurrentFilm(films, routeProps.match.params.id);

            return (
              isLoading ? <Loader /> :
                <AddReviewWrapped {...routeProps}
                  authorizationStatus={authorizationStatus}
                  authInfo={authInfo}
                  film={сurrentFilm}
                  onReviewSubmit={onReviewSubmit}
                />
            );
          }}
        />

        <PrivateRoute
          exact path={AppPages.MY_LIST}
          render={(routeProps) => {
            return (
              <MyListWrapped {...routeProps}
                authorizationStatus={authorizationStatus}
                authInfo={authInfo}
                onFilmListItemClick={onFilmListItemClick}
                favoriteFilms={favoriteFilms}
              />
            );
          }}
        />

        <Route
          component={ErrorMessage}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  films: Movies.isRequired,
  favoriteFilms: Movies,
  extraInfoFilm: Movie,
  promoFilm: Movie,

  onFilmListItemClick: PropTypes.func.isRequired,

  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  authInfo: PropTypes.object,
  isSignInError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addFilmToFavorites: PropTypes.func.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromoFilm(state),
  favoriteFilms: getFavoriteFilms(state),
  reviews: getReviews(state),
  extraInfoFilm: getCurrentFilmCard(state),

  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  isSignInError: getIsSignInError(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilmListItemClick(film) {
    dispatch(ActionCreator.getFilmCard(film));
    dispatch(DataOperation.loadReviews(film.id));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onReviewSubmit(filmId, review) {
    dispatch(DataOperation.postReview(filmId, review));
  },
  addFilmToFavorites(film) {
    dispatch(DataOperation.addFilmToFavorites(film));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
