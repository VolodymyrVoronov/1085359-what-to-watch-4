import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {title, genre, releaseDate, movieNames} = props;

  return (
    <Main
      title={title}
      genre={genre}
      releaseDate={releaseDate}
      movieNames={movieNames}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  movieNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired
};

export default App;
