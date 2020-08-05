import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const DIVIDER = 2;

// const getRatingScore = (score) => {
//   return score.toFixed(1).replace(`.`, `,`);
// }

class Reviews extends PureComponent {
  render() {
    const {reviews} = this.props;
    const reviewsOne = reviews.slice(reviews.length / DIVIDER);
    const reviewsTwo = reviews.slice(0, reviews.length / DIVIDER);
    const reviewsInColumns = [reviewsOne, reviewsTwo];

    return (
      <div className="movie-card__reviews movie-card__row">
        {
          reviewsInColumns.map((reviewsInColumnsItems, index) => {
            return (
              <div className="movie-card__reviews-col" key={index + Math.random() + Math.random()}>
                {
                  reviewsInColumnsItems.map((review, indexItem) => {

                    const date = new Date(review.date);

                    return (
                      <div key={indexItem} className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">{review.comment}</p>
                          <footer className="review__details">
                            <cite className="review__author">{review.user.name}</cite>
                            <time className="review__date" dateTime={date.toISOString()}>{
                              date.toLocaleDateString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`, timeZone: `Europe/Moscow`})
                            }</time>
                          </footer>
                        </blockquote>
                        <div className="review__rating">{review.rating}</div>
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default Reviews;
