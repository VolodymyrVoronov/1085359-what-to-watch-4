import React, {PureComponent} from "react";
import withActiveTab from '../../hocs/with-acitve-tab.jsx';
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import Overview from "../overview/overview.jsx";
import Details from "../details/details.jsx";
import Reviews from "../reviews/reviews.jsx";

import {Movie} from "../types-of-props.js";

const RATING_LEVELS = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  COOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getRating = (points) => {
  let rating;
  if (points <= 0 || points <= 3) {
    rating = RATING_LEVELS.BAD;
  }
  if (points <= 3 || points <= 5) {
    rating = RATING_LEVELS.NORMAL;
  }
  if (points <= 5 || points <= 8) {
    rating = RATING_LEVELS.COOD;
  }
  if (points <= 8 || points <= 10) {
    rating = RATING_LEVELS.VERY_GOOD;
  }
  if (points >= 10) {
    rating = RATING_LEVELS.AWESOME;
  }
  return rating;
};

const getFilmDuration = (duration) => {
  const hours = duration / 60 ^ 0;
  if (hours) {
    let minutes = duration % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h ${minutes}m`;
  } else {
    return `${duration}m`;
  }
};

class MovieExtraInfo extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  _renderState() {
    const {film, activeTab} = this.props;
    
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
          />
      );
    }

    if (activeTab === 2) {
      return (
        <Reviews
            film={film}
          />
      );
    }

    return null;
  }

  render() {

    const {film, activeTab, onTabClick} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.img} alt={`${film.title} poster`} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.img} alt={`${film.title} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
                <Tabs 
                  currentTab={activeTab}
                  onTabClick={onTabClick}
                />
                {
                  this._renderState()
                }



              <div className="movie-rating">
                <div className="movie-rating__score">{film.rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{getRating(film.rating)}</span>
                  <span className="movie-rating__count">{`${film.ratingReviewsCount} ratings`}</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{film.description}</p>
                <p>{film.story}</p>
                <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
                <p className="movie-card__starring"><strong>Starring: {film.actors.join(`, `)}</strong></p>
              </div>

              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">{getFilmDuration(film.runTime)}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">{film.genre}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">{film.releaseDate}</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

MovieExtraInfo.propTypes = {
  film: Movie.isRequired,
  // onTabClick: PropTypes.func.isRequired,
  // activeTab: PropTypes.func.isRequired,
};

export default MovieExtraInfo;
