// import {MOVIES} from "./mocks/films.js";
import {ALL_GENRE, GENRES} from "../../components/const.js";

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
  // promoFilm: MOVIES[0],

  // allFilms: MOVIES,
  // catalogGenres: [ALL_GENRE].concat(getGenresFromFilms(MOVIES)),
  catalogGenre: ALL_GENRE,
  showCount: CATALOG_FILMS_PER_PAGE_LIMIT,
  extraInfoFilm: null,
  isFullScreenOn: false,
};

const ActionType = {
  SET_CATALOG_GENRE: `SET_CATALOG_GENRE`,
  GET_MORE_CATALOG_FILMS: `GET_MORE_CATALOG_FILMS`,
  SET_CURRENT_FILM: `SET_CURRENT_FILM`,
  GET_FILM_CARD: `GET_FILM_CARD`,
  SET_FULL_SCREEN: `SET_FULL_SCREEN`,
};

const ActionCreator = {
  setCurrentFilm: (film) => {
    return {
      type: ActionType.SET_CURRENT_FILM,
      payload: film,
    };
  },

  setCatalogGenre: (genre) => {
    return {
      type: ActionType.SET_CATALOG_GENRE,
      payload: genre,
    };
  },

  getMoreCatalogFilms: () => {
    return {
      type: ActionType.GET_MORE_CATALOG_FILMS,
      payload: undefined,
    };
  },

  getFilmCard: (film) => {
    return {
      type: ActionType.GET_FILM_CARD,
      payload: film,
    };
  },

  toggleFullScreenPlayer: (flag) => ({
    type: ActionType.SET_FULL_SCREEN,
    payload: flag,
  }),
};

const _setCurrentFilm = (state, film) => {
  return Object.assign({}, state, {extraInfoFilm: film});
};

const _setCatalogGenre = (state, genre) => {
  const update = {
    catalogGenre: genre,
    showCount: CATALOG_FILMS_PER_PAGE_LIMIT
  };

  return Object.assign({}, state, update);
};

const _getMoreCatalogFilms = (state) => {
  const update = {
    showCount: state.showCount + CATALOG_FILMS_PER_PAGE_LIMIT
  };

  return Object.assign({}, state, update);
};

const _getFilmCard = (state, film) => {
  return Object.assign({}, state, {extraInfoFilm: film});
};

const _setFullScreen = (state, film) => {
  return Object.assign({}, state, {isFullScreenOn: film});
};

const reducer = (state = initialState, action) => {

  if (action.type === ActionType.SET_CURRENT_FILM) {
    return _setCurrentFilm(state, action.payload);
  }

  if (action.type === ActionType.SET_CATALOG_GENRE) {
    return _setCatalogGenre(state, action.payload);
  }

  if (action.type === ActionType.GET_MORE_CATALOG_FILMS) {
    return _getMoreCatalogFilms(state);
  }

  if (action.type === ActionType.GET_FILM_CARD) {
    return _getFilmCard(state, action.payload);
  }

  if (action.type === ActionType.SET_FULL_SCREEN) {
    return _setFullScreen(state, action.payload);
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
