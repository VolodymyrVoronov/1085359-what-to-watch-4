import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = ({currentMovie, films}) => {

  return (
    <Main
      currentMovie={currentMovie}
      films={films}
      onTitleClickHandler={titleClickHandler}
    />
  );
};

App.propTypes = {
  currentMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }).isRequired,

  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  })).isRequired,
};

export default App;
