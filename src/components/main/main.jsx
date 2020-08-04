import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Catalog from "../catalog/catalog.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

import {getPromoFilm} from "../../reducer/data/selectors.js";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";
import {getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import {Movie} from "../types-of-props.js";

const Main = ({promoFilm, onFilmListItemClick, onPlayButtonClick, authorizationStatus, authInfo, onSignInClick}) => {
  if (!promoFilm) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          authorizationStatus={authorizationStatus}
          authInfo={authInfo}
          onSignInClick={onSignInClick}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.poster} alt={`${promoFilm.title} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonClick}>
                  <svg id="play-s" viewBox="0 0 19 19" width="19" height="19">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Catalog
            onFilmListItemClick={onFilmListItemClick}
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  onFilmListItemClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,

  promoFilm: Movie,

  authorizationStatus: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  authInfo: PropTypes.object.isRequired,
};

Main.defaultProps = {
  films: [],
};

function mapStateToProps(state) {
  return {
    promoFilm: getPromoFilm(state),
    isSignedIn: getIsSignedIn(state),
    isSignInError: getIsSignInError(state),
  };
}

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn(true));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
