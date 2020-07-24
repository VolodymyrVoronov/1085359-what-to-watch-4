import React, {PureComponent} from "react";
import Tabs from "../tabs/tabs.jsx";
import Overview from "../overview/overview.jsx";
import Details from "../details/details.jsx";
import Reviews from "../reviews/reviews.jsx";
import PropTypes from "prop-types";

import {Movie, Movies} from "../types-of-props.js";

class MovieExtraInfo extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderState() {
    const {film, films, activeTab} = this.props;

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
          film={film}
        />
      );
    }

    return null;
  }

  render() {

    const {film, activeTab, onTabClick, onPlayButtonClick} = this.props;

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
                <span className="movie-card__genre">{film.genres.join(`, `)}</span>
                <span className="movie-card__year">{film.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                  <svg id="play-s" viewBox="0 0 19 19">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
                  </svg>
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
  onTabClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default MovieExtraInfo;
