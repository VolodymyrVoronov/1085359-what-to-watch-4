import {createSelector} from "reselect";
import {getGenre, getShownFilmCards} from "./app/selectors.js";
import {getFilms} from "./data/selectors.js";
import {ALL_GENRE} from "../components/const.js";

const getFilmsByGenre = (films, genre, exclude = []) => {
  return films.filter((film) => film.genre === genre && !exclude.includes(film));
};

const getGenreFilms = createSelector(
    getFilms,
    getGenre,
    (allFilms, genre) => {
      const genreFilms = (genre === ALL_GENRE) ? allFilms : getFilmsByGenre(allFilms, genre);
      return genreFilms;
    }
);

const getShowFilms = createSelector(
    getGenreFilms,
    getShownFilmCards,
    (getGenreFilmsItem, count) => {
      const films = getGenreFilmsItem.slice(0, count);
      return films;
    }
);

const hasMoreFilms = createSelector(
    getGenreFilms,
    getShownFilmCards,
    (getGenreFilmsItem, getShownFilmCardsItem) => {
      return getGenreFilmsItem.length > getShownFilmCardsItem;
    }
);

export {getShowFilms, hasMoreFilms};
