import {createFilm, createFilms} from "../../adapter.js";
import {extend} from "../../utils.js";
import {ActionCreator as AppActionCreator} from "../app/app.js";

const initialState = {
  films: [],
  promoFilm: null,
  reviews: null,
  isError: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CATCH_ERROR: `CATCH_ERROR`,
  POST_REVIEW: `POST_REVIEW`,
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
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadFilms(createFilms(response.data)));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
    });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      dispatch(ActionCreator.loadPromoFilm(createFilm(response.data)));
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
      dispatch(ActionCreator.catchError());
    });
  },
  postReview: (filmId, review) => (dispatch, getState, api) => {
    return api.post(`comments/${filmId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.postReview(review));
      dispatch(AppActionCreator.toggleFormState(true));
      dispatch(Operation.loadReviews(filmId));
    }).
    then(() => {
      dispatch(AppActionCreator.addReview(false));
      dispatch(AppActionCreator.toggleFormState(false));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
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
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator, initialState};
