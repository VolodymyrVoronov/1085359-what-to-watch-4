const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

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
