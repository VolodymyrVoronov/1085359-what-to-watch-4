import NameSpace from "../name-space.js";
import {GENRES} from "../../components/const.js";
import {createSelector} from "reselect";

export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getIsError = (state) => {
  return state[NameSpace.DATA].isError;
};

export const getGenresFromFilms = createSelector(
    getFilms,
    (getFilmsItem) => {
      const allGenres = `All genres`;
      const genres = [];

      genres.push(allGenres);

      getFilmsItem.forEach(({genre}) => {
        const alias = GENRES.label || genre;

        if (genres.includes(alias)) {
          return;
        }
        genres.push(alias);
      });

      return genres;
    }
);
