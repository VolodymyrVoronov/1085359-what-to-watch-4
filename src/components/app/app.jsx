import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch, Redirect, Router} from "react-router-dom";

import Main from "../main/main.jsx";
import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";
import FullPlayer from "../full-player/full-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import Loader from "../loader/loader.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../../private-route.jsx";
import AddReview from "../add-review/add-review.jsx";

import {Movies, Movie} from "../types-of-props.js";
import {AppPages} from "../const.js";
import history from "../../history.js";

import {ActionCreator} from "../../reducer/app/app.js";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";

import {getPromoFilm, getFilms, getReviews, getFavoriteFilms, getIsError} from "../../reducer/data/selectors.js";
import {getCurrentFilmCard, getIsFullScreenOn, getIsLoading} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
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

// class App extends PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   _renderState() {
//     const {films, extraInfoFilm, isFullScreenOn, onFilmListItemClick, handlePlayButtonClick, handleExitButtonClick, authInfo, authorizationStatus, login, onSignInClick, isSignedIn, isSignInError, isError} = this.props;

//     if (isError && !extraInfoFilm) {
//       return (
//         <ErrorMessage />
//       );
//     }

//     if (extraInfoFilm && !isFullScreenOn) {
//       return (
//         <MovieExtraInfoWrapped
//           film={extraInfoFilm}
//           films={films}
//           onPlayButtonClick={handlePlayButtonClick}
//           authInfo={authInfo}
//           authorizationStatus={authorizationStatus}
//           isSignedIn={isSignedIn}
//           onSignInClick={onSignInClick}
//         />
//       );
//     }

//     if (isFullScreenOn) {
//       return (
//         <FullPlayerWrapped
//           film={films[0]}
//           onExitButtonClick={handleExitButtonClick}
//         />
//       );
//     }

//     if (isSignedIn) {
//       return (
//         <SignIn
//           onSubmit={login}
//           isSignInError={isSignInError}
//         />
//       );
//     }

//     return (
//       <Main
//         film={films[0]}
//         onFilmListItemClick={onFilmListItemClick}
//         onPlayButtonClick={handlePlayButtonClick}
//         authInfo={authInfo}
//         isSignedIn={isSignedIn}
//         authorizationStatus={authorizationStatus}
//         onSignInClick={onSignInClick}
//       />
//     );
//   }

//   render() {
//     const {films, extraInfoFilm, handlePlayButtonClick, authorizationStatus, isSignedIn, authInfo, onSignInClick} = this.props;

//     return (
//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/">
//             {this._renderState()}
//           </Route>

//           <Route exact path="/movie-detail-info">
//             <MovieExtraInfoWrapped
//               film={extraInfoFilm}
//               films={films}
//               onPlayButtonClick={handlePlayButtonClick}
//               authInfo={authInfo}
//               authorizationStatus={authorizationStatus}
//               isSignedIn={isSignedIn}
//               onSignInClick={onSignInClick}
//             />
//           </Route>
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }

const getCurrentFilm = (films, params) => {
  return films.find((film) => film.id === parseInt(params, 10));
};

const App = (props) => {
  const {films, promoFilm, isFullScreenOn, onFilmListItemClick, handlePlayButtonClick, handleExitButtonClick, authInfo, authorizationStatus, login, onSignInClick, isSignedIn, isSignInError, isError, isLoading, addFilmToFavorites, favoriteFilms} = props;
  console.log(isLoading);
  if (films.length === 0) {
    return <Loader />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route 
          exact path={`${AppPages.MAIN}`}
          render={() => {

            return (
              isLoading ? <Loader /> :
                <Main 
                  film={films[0]}
                  promoMovie={promoFilm}
                  onFilmListItemClick={onFilmListItemClick}
                  onPlayButtonClick={handlePlayButtonClick}
                  authInfo={authInfo}
                  isSignedIn={isSignedIn}
                  authorizationStatus={authorizationStatus}
                  onSignInClick={onSignInClick}
                  addFilmToFavorites={addFilmToFavorites}
                />
            );
          }}
        />

        <Route 
          exact path={`${AppPages.SIGN_IN}`}
          render={() => {

            return (
              authorizationStatus === AuthorizationStatus.AUTH ?
                <Redirect to={AppPages.MAIN} /> :
                <SignIn
                  onSubmit={login}
                  isSignInError={isSignInError}
                />
            ) 
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
                  onPlayButtonClick={handlePlayButtonClick}
                  authInfo={authInfo}
                  authorizationStatus={authorizationStatus}
                  isSignedIn={isSignedIn}
                  onSignInClick={onSignInClick}
                />
            );
          }}
        />

        <Route 
          exact path={`${AppPages.PLAYER}/:id/`}
          render={(routeProps) => {
            const сurrentFilm = getCurrentFilm(films, routeProps.match.params.id);
            console.log(сurrentFilm);
            return (
              isLoading ? <Loader /> :
                <FullPlayerWrapped
                  film={сurrentFilm ? сurrentFilm : promoFilm}
                  onExitButtonClick={handleExitButtonClick}
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
  )
}

App.propTypes = {
  films: Movies.isRequired,
  extraInfoFilm: Movie,

  onFilmListItemClick: PropTypes.func.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
  handleExitButtonClick: PropTypes.func.isRequired,
  isFullScreenOn: PropTypes.bool.isRequired,

  isError: PropTypes.bool,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  authInfo: PropTypes.object,
  onSignInClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  isSignInError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addMovieToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromoFilm(state),
  favoriteFilms: getFavoriteFilms(state),
  reviews: getReviews(state),
  extraInfoFilm: getCurrentFilmCard(state),
  isFullScreenOn: getIsFullScreenOn(state),

  isError: getIsError(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  isSignedIn: getIsSignedIn(state),
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
  onReviewSubmit(filmID, review) {
    dispatch(DataOperation.postReview(filmID, review));
  },
  addFilmToFavorites(film) {
    dispatch(DataOperation.addFilmToFavorites(film));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
