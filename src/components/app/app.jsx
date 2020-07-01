import React, {PureComponent} from "react";
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
    const {currentMovie, films} = this.props;

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
        currentMovie={currentMovie}
        films={films}
        onMovieListItemClick={this._handleMovieListItemClick}
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
              film={films[0]}
              films={films}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  currentMovie: Movie.isRequired,
  films: Movies.isRequired,
};

export default App;
