import PropTypes from "prop-types";

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
  releaseDate: PropTypes.number.isRequired,

  poster: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  runtime: PropTypes.number.isRequired,
  previewVideo: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(Review),
  isFavorite: PropTypes.bool.isRequired,
  rating: PropTypes.shape({
    score: PropTypes.number,
    count: PropTypes.number,
  }),
}));

export const Movie = PropTypes.exact({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,

  poster: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  runtime: PropTypes.number.isRequired,
  previewVideo: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(Review),
  isFavorite: PropTypes.bool.isRequired,
  rating: PropTypes.shape({
    score: PropTypes.number,
    count: PropTypes.number,
  }),
});
