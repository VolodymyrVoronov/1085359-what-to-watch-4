import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {MOVIES} from "./mocks/films.js";
import {ALL_GENRE, GENRES} from "./components/const.js";

import {reducer} from "./reducer.js";
import {createStore} from "redux";
import {Provider} from "react-redux";

const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

const getGenresFromFilms = (source) => {

  const genres = [];

  source.forEach((film) => {
    film.genres.forEach((genre) => {

      const alias = GENRES.label || genre;

      if (genres.includes(alias)) {
        return;
      }
      genres.push(alias);
    });
  });

  return genres;
};

const initialState = {
  currentFilm: undefined,
  promoFilm: MOVIES[0],

  allFilms: MOVIES,
  catalogGenres: [ALL_GENRE].concat(getGenresFromFilms(MOVIES)),
  catalogGenre: ALL_GENRE,
  showCount: CATALOG_FILMS_PER_PAGE_LIMIT,
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        films={MOVIES}
      />
    </Provider>,

    document.querySelector(`#root`)
);
