import {createSelector} from "reselect";
import {getGenre, getShownFilmCards} from "./app/selectors.js";
import {getFilms} from "./data/selectors.js";
import {ALL_GENRE} from "../components/const.js";

const getFilmsByGenre = (films, genre, exclude = []) => {
  return films.filter((film) => film.genre == genre && !exclude.includes(film));
};

const getGenreFilms = createSelector(
	getFilms,
	getGenre,
	(allFilms, genre) => {
		const genreFilms = (genre === ALL_GENRE) ? allFilms : getFilmsByGenre(allFilms, genre);
		return genreFilms;
	}
);

const getShowFilms = (state) => {
	const genreFilms = getGenreFilms(state);
	const count = getShownFilmCards(state);
  const films = genreFilms.slice(0, count);
  return films
}

const hasMoreFilms = (state) => {
	const genreFilms = getGenreFilms(state);
	const count = getShownFilmCards(state);
	return genreFilms.length > count;
}

export {getShowFilms, hasMoreFilms};