import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";

import {Movies, Movie} from "../types-of-props.js";

import withActiveTab from "../../hocs/with-active-tab.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderState() {
    const {films, extraInfoFilm, handleMovieCardClick} = this.props;
    if (extraInfoFilm) {
      return (
        <MovieExtraInfoWrapped
          film={extraInfoFilm}
          films={films}
        />
      );
    }

    return (
      <Main
        onFilmListItemClick={handleMovieCardClick}
      />
    );
  }

  render() {
    const {films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderState()}
          </Route>
          <Route exact path="/dev-movie-detail-info">
            <MovieExtraInfoWrapped
              films={films}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: Movies.isRequired,
  extraInfoFilm: Movie.isRequired,

  handleMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  extraInfoFilm: state.extraInfoFilm,
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieCardClick(film) {
    dispatch(ActionCreator.getFilmCard(film));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
