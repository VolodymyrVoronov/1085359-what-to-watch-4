import PropTypes from 'prop-types';

export const Review = PropTypes.exact({
  author: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
});

export const Movies = PropTypes.arrayOf(PropTypes.exact({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,

  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingReviewsCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  story: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  runTime: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(Review),
}));

export const Movie = PropTypes.exact({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,

  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingReviewsCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  story: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  runTime: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(Review),
});
