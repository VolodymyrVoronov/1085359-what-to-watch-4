import React, {PureComponent} from "react";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";

import {Movies, Movie} from "../types-of-props.js";


import withActiveTab from "../../hocs/with-active-tab.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      extraInfoMovie: undefined,
    };

    this._handleMovieListItemClick = this._handleMovieListItemClick.bind(this);
  }

  _handleMovieListItemClick({film}) {
    this.setState(() => {
      return {
        extraInfoMovie: film,
      };
    });
  }

  _renderState() {
    const {extraInfoMovie} = this.state;
    const {currentFilm, films} = this.props;

    if (extraInfoMovie) {
      return (
        <MovieExtraInfoWrapped
          film={extraInfoMovie}
          films={films}
        />
      );
    }

    return (
      <Main
        currentFilm={currentFilm}
        films={films}
        onFilmListItemClick={this._handleMovieListItemClick}
      />
    );
  }

  render() {
    const {films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">{
            this._renderState()
          }</Route>
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
  currentFilm: Movie.isRequired,
  films: Movies.isRequired,
};

function mapStateToProps(state) {
  return {
    films: state.catalogFilms,
    currentMovie: state.currentFilm,
  };
}
export {App};
export default connect(mapStateToProps)(App);
