import NameSpace from "../name-space.js";
import {GENRES} from "../../components/const.js";

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

export const getGenresFromFilms = (state) => {
  const films = getFilms(state);
  const genres = [];


  films.forEach(({genre}) => {
    const alias = GENRES.label || genre;

    if (genres.includes(alias)) {
      return;
    }
    genres.push(alias);
  });

  return genres;
}
