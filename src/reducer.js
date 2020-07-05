
import {ALL_GENRE} from "./components/const.js";

const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

const getFimsByGenre = (source, genre, exclude = []) => {
  return source.filter((film) => film.genres.includes(genre) && !exclude.includes(film));
};

export const ActionCreator = {
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
  }
};

export const ActionType = {
  SET_CATALOG_GENRE: `SET_CATALOG_GENRE`,
  GET_MORE_CATALOG_FILMS: `GET_MORE_CATALOG_FILMS`,
  SET_CURRENT_FILM: `SET_CURRENT_FILM`,
};

const _setCurrentFilm = (state, film) => {
  return Object.assign({}, state, {currentFilm: film});
};

const _setCatalogGenre = (state, genre) => {

  const {allFilms} = state;
  const genreFilms = genre === ALL_GENRE ? allFilms : getFimsByGenre(allFilms, genre);
  const pageFilms = genreFilms.slice(0, CATALOG_FILMS_PER_PAGE_LIMIT);
  const update = {
    catalogGenre: genre,
    catalogFilms: pageFilms,
    hasMoreСatalogFilms: pageFilms.length < genreFilms.length,
  };

  return Object.assign({}, state, update);
};

const _getMoreCatalogFilms = (state) => {

  const {catalogGenre, catalogFilms, allFilms} = state;
  const genreFilms = catalogGenre === ALL_GENRE ? allFilms : getFimsByGenre(allFilms, catalogGenre);
  const pageFilms = genreFilms.slice(0, catalogFilms.length + CATALOG_FILMS_PER_PAGE_LIMIT);
  const update = {
    catalogFilms: pageFilms,
    hasMoreСatalogFilms: pageFilms.length < genreFilms.length,
  };

  return Object.assign({}, state, update);
};

export const reducer = (state, action) => {

  if (action.type === ActionType.SET_CURRENT_FILM) {
    return _setCurrentFilm(state, action.payload);
  }
  if (action.type === ActionType.SET_CATALOG_GENRE) {
    return _setCatalogGenre(state, action.payload);
  }
  if (action.type === ActionType.GET_MORE_CATALOG_FILMS) {
    return _getMoreCatalogFilms(state);
  }
  return state;
};
