import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import MovieExtraInfo from "../movie-extra-info/movie-extra-info.jsx";

import {Movies} from "../types-of-props.js";

import withActiveTab from "../../hocs/with-active-tab.jsx";

const MovieExtraInfoWrapped = withActiveTab(MovieExtraInfo);

class App extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   extraInfoFilm: undefined,
    // };

    // this._handleMovieListItemClick = this._handleMovieListItemClick.bind(this);
  }

  // _handleMovieListItemClick({film}) {
  //   this.setState(() => {
  //     return {
  //       extraInfoFilm: film,
  //     };
  //   });
  // }

  _renderState() {
    // const {extraInfoFilm} = this.state;
    const {films, extraInfoFilm, handleMovieCardClick} = this.props;
    console.log(this.props);
    console.log(extraInfoFilm);
    
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

// export default App;
