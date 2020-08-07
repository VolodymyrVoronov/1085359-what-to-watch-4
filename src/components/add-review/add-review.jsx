import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import {connect} from "react-redux";
import {getIsError} from "../../reducer/data/selectors.js";
import {getIsFormDisabled} from "../../reducer/app/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

import {Link} from "react-router-dom";
import {AppPages} from "../const.js";

import {Movie} from "../types-of-props.js";

const Review = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
};

const AMOUNT_ON_START = 5;

const AddReview = (props) => {
  const {authorizationStatus, authInfo, onSignInClick, film, onRatingChange, onReviewChange, onReviewFormSubmit, isSubmitButtonDisabled, isError, isFormDisabled} = props;

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={film.backgroundImage} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            authorizationStatus={authorizationStatus}
            authInfo={authInfo}
            onSignInClick={onSignInClick}>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    to={`${AppPages.FILM}/${film.id}`}
                    className="breadcrumbs__link">{film.title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={film.poster} alt={`${film.title} poster`} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={onReviewFormSubmit}
            disabled={isFormDisabled}
          >
            <div className="rating">
              <div className="rating__stars" onChange={onRatingChange}>
                {new Array(AMOUNT_ON_START)
                  .fill()
                  .map((element, index) => {
                    const rating = index + 1;
                    return (
                      <React.Fragment key={`key - ${rating}`}>
                        <input
                          className="rating__input"
                          id={`star-${rating}`}
                          type="radio"
                          name="rating"
                          value={rating}
                        />
                        <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                      </React.Fragment>
                    );
                  })
                }
              </div>
            </div>

            <div className="add-review__text" style={{backgroundColor: `rgba(255, 255, 255, 0.9)`}}>
              <textarea
                className="add-review__textarea"
                name="review-text" id="review-text"
                placeholder="Review text"
                minLength={Review.MIN_LENGTH}
                maxLength={Review.MAX_LENGTH}
                onChange={onReviewChange}
                required
              ></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={isSubmitButtonDisabled}
                  style={{cursor: `${isSubmitButtonDisabled ? `default` : `pointer`}`}}
                >Post</button>
              </div>

            </div>
          </form>
          {isError &&
            <p style={{color: `#000000`, textAlign: `center`}}>Your review has not been sent. Please try again later.</p>}
        </div>

      </section>
    </React.Fragment>
  );
};

AddReview.propTypes = {
  film: Movie.isRequired,

  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onReviewFormSubmit: PropTypes.func.isRequired,
  isSubmitButtonDisabled: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isError: getIsError(state),
  isFormDisabled: getIsFormDisabled(state),
});

const mapDispatchToProps = (dispatch) => ({
  onReviewSubmit(movieId, review) {
    dispatch(DataOperation.postReview(movieId, review));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
