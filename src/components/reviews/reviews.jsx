import React, {PureComponent} from "react";

import {Movie} from "../types-of-props.js";

const DIVIDER = 2;

// const getRatingScore = (score) => {
//   return score.toFixed(1).replace(`.`, `,`);
// }

class Reviews extends PureComponent {
  render() {
    const {film} = this.props;
    const {reviews} = film;

    const reviewsOne = reviews.slice(reviews.length / DIVIDER);
    const reviewsTwo = reviews.slice(0, reviews.length / DIVIDER);

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {
            reviewsOne.map((review, index) => {

              const date = new Date(review.date);

              return (
                <div key={index} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{review.text}</p>
                    <footer className="review__details">
                      <cite className="review__author">{review.author}</cite>
                      <time className="review__date" dateTime={date.toISOString()}>{
                        date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`})
                      }</time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{review.score}</div>
                </div>
              );
            })
          }
        </div>
        <div className="movie-card__reviews-col">
          {
            reviewsTwo.map((review, index) => {

              const date = new Date(review.date);

              return (
                <div key={index} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{review.text}</p>
                    <footer className="review__details">
                      <cite className="review__author">{review.author}</cite>
                      <time className="review__date" dateTime={date.toISOString()}>{
                        date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`})
                      }</time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{review.score}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  film: Movie.isRequired,
};

export default Reviews;
