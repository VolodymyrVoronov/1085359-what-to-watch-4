import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Tabs from "../tabs/tabs.jsx";
import Overview from "../overview/overview.jsx";
import Details from "../details/details.jsx";
import Reviews from "../reviews/reviews.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Header from "../header/header.jsx";
// import AddReview from "../add-review/add-review.jsx";

import {Movie, Movies} from "../types-of-props.js";

import {Link} from "react-router-dom";
import {AppPages} from "../const.js";
import history from "../../history.js";

import {ActionCreator as UserActionCreator, AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getAuthorizationInfo} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";

import {getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
import {getReviews} from "../../reducer/data/selectors.js";
import {getIsReviewOpen} from "../../reducer/app/selectors.js";

// import withAddReview from "../../hocs/with-active-add-review.jsx";

// const AddReviewWrapped = withAddReview(AddReview);

class MovieExtraInfo extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderState() {
    const {film, films, reviews, activeTab} = this.props;
    if (activeTab === 0) {
      return (
        <Overview
          film={film}
        />
      );
    }

    if (activeTab === 1) {
      return (
        <Details
          film={film}
          films={films}
        />
      );
    }

    if (activeTab === 2) {
      return (
        <Reviews
          reviews={reviews}
        />
      );
    }

    return null;
  }

  componentDidMount() {
    const {film, loadFilmData} = this.props;
    loadFilmData(film);
  }

  componentDidUpdate() {
    const {film, loadFilmData} = this.props;
    loadFilmData(film);
  }

  _handleMyListClick() {
    const {authorizationStatus, film, addFilmToFavorites} = this.props;

    return authorizationStatus === AuthorizationStatus.AUTH ?
      addFilmToFavorites(film) :
      history.push(AppPages.SIGN_IN);
  }

  render() {

    
    const {film, activeTab, onTabClick, onPlayButtonClick, login, isSignInError, authInfo, authorizationStatus, onSignInClick, isSignedIn, isReviewOpen, onReviewSubmit, onAddReviewClick, } = this.props;

    console.log(film);

    if (isSignedIn) {
      return (
        <SignIn
          onSubmit={login}
          isSignInError={isSignInError}
        />
      );
    }

    // if (isReviewOpen) {
    //   return (
    //     <AddReviewWrapped
    //       authorizationStatus={authorizationStatus}
    //       authInfo={authInfo}
    //       onSignInClick={onSignInClick}
    //       film={film}
    //       onReviewSubmit={onReviewSubmit}
    //     />
    //   );
    // }

    return (
      <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.backgroundImage} alt={`${film.title} poster`} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            authorizationStatus={authorizationStatus}
            authInfo={authInfo}
            onSignInClick={onSignInClick}
          />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <Link
                  to={`${AppPages.PLAYER}/${film.id}`}
                  className="btn btn--play movie-card__button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={this._handleMyListClick}
                >
                  {film.isFavorite ?
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg> :
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>}
                  <span>My list</span>
                    </button>

                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <Link
                    to={`${AppPages.FILM}/${film.id}/review`}
                    className="btn movie-card__button"
                  >Add review
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.poster} alt={`${film.title} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs
                currentTab={activeTab}
                onTabClick={onTabClick}
              />
              {this._renderState()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

MovieExtraInfo.propTypes = {
  film: Movie.isRequired,
  films: Movies.isRequired,
  reviews: PropTypes.array,
  onTabClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func,
  activeTab: PropTypes.number.isRequired,

  authorizationStatus: PropTypes.string,
  onSignInClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  isSignInError: PropTypes.bool.isRequired,

  // onAddReviewClick: PropTypes.func.isRequired,
  isReviewOpen: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,

  authInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),

  addFilmToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  isSignedIn: getIsSignedIn(state),
  isSignInError: getIsSignInError(state),
  isReviewOpen: getIsReviewOpen(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn(true));
  },
  // onAddReviewClick() {
  //   dispatch(AppActionCreator.addReview(true));
  // },
  // onReviewSubmit(filmId, review) {
  //   dispatch(DataOperation.postReview(filmId, review));
  // },
  addMovieToFavorites(film) {
    dispatch(DataOperation.addFilmToFavorites(film));
  },
  loadFilmData(film) {
    dispatch(ActionCreator.getFilmCard(film));
  }
});

export {MovieExtraInfo};
export default connect(mapStateToProps, mapDispatchToProps)(MovieExtraInfo);
