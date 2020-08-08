import {createFilm, createFilms} from "../../adapter.js";
import {extend} from "../../utils.js";
import {ActionCreator as AppActionCreator} from "../app/app.js";
import history from "../../history.js";

const initialState = {
  films: [],
  promoFilm: null,
  reviews: null,
  favoriteFilms: [],
  isError: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CATCH_ERROR: `CATCH_ERROR`,
  POST_REVIEW: `POST_REVIEW`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films,
    };
  },
  loadPromoFilm: (promoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm,
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  catchError: () => {
    return {
      type: ActionType.CATCH_ERROR,
      payload: true,
    };
  },
  postReview: (review) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: review,
    };
  },
  loadFavoriteFilms: (favoriteFilms) => {
    return {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: favoriteFilms,
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadFilms(createFilms(response.data)));
    })
    .then(() => {
      dispatch(AppActionCreator.toggleLoadingState(false));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError(true));
    });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      dispatch(ActionCreator.loadPromoFilm(createFilm(response.data)));
    })
    .then(() => {
      dispatch(AppActionCreator.toggleLoadingState(false));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
    });
  },
  loadReviews: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError(true));
    });
  },
  postReview: (filmId, review) => (dispatch, getState, api) => {
    return api.post(`comments/${filmId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.catchError(false));
      dispatch(ActionCreator.postReview(review));
      dispatch(AppActionCreator.toggleFormState(true));
      dispatch(Operation.loadReviews(filmId));
    }).
    then(() => {
      history.goBack();
      dispatch(AppActionCreator.toggleFormState(false));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError(true));
    });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      dispatch(ActionCreator.loadFavoriteFilms(createFilms(response.data)));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError(true));
    });
  },
  addFilmToFavorites: (film) => (dispatch, getState, api) => {
    return api.post(`/favorite/${film.id}/${film.isFavorite ? 0 : 1}`)
    .then(() => {
      dispatch(Operation.loadFilms());
      dispatch(Operation.loadPromoFilm());
      dispatch(Operation.loadFavoriteFilms());
    })
    .catch(() => {
      dispatch(ActionCreator.catchError(true));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        isError: action.payload,
      });
    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator, initialState};
