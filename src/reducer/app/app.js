import {ALL_GENRE} from "../../components/const.js";
import {extend} from "../../utils.js";

const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

const initialState = {
  catalogGenre: ALL_GENRE,
  showCount: CATALOG_FILMS_PER_PAGE_LIMIT,
  extraInfoFilm: null,
  isFullScreenOn: false,
  isReviewOpen: false,
  isFormDisabled: false,
};

const ActionType = {
  SET_CATALOG_GENRE: `SET_CATALOG_GENRE`,
  GET_MORE_CATALOG_FILMS: `GET_MORE_CATALOG_FILMS`,
  SET_CURRENT_FILM: `SET_CURRENT_FILM`,
  GET_FILM_CARD: `GET_FILM_CARD`,
  SET_FULL_SCREEN: `SET_FULL_SCREEN`,
  ADD_REVIEW: `ADD_REVIEW`,
  TOGGLE_FORM_STATE: `TOGGLE_FORM_STATE`,
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
  addReview: (bool) => ({
    type: ActionType.ADD_REVIEW,
    payload: bool,
  }),
  toggleFormState: (bool) => ({
    type: ActionType.TOGGLE_FORM_STATE,
    payload: bool,
  })
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

  if (action.type === ActionType.ADD_REVIEW) {
    return extend(state, {
      isReviewOpen: action.payload,
    });
  }

  if (action.type === ActionType.TOGGLE_FORM_STATE) {
    return extend(state, {
      isFormDisabled: action.payload,
    });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
