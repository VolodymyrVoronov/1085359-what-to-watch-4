import configureStore from 'redux-mock-store';
import {ALL_GENRE, GENRES} from "./components/const.js";
import {ActionCreator, ActionType, reducer} from './reducer.js';

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

const MOVIES = [
  {
    id: 1,
    title: `Citizen Kane`,
    genres: [`Comedy`, `Sci-Fi`, `Horror`],
    img: `img/bg-the-grand-budapest-hotel.jpg`,
    releaseDate: 2014,

    poster: `img/bg-the-grand-budapest-hotel.jpg`,
    rating: 7.8,
    ratingReviewsCount: 10,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
    story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
    director: `Director`,
    actors: [
      `Actor 1`,
      `Actor 2`,
      `Actor 3`,
      `Actor 4`,
      `Actor 5`,
    ],
    runTime: 200,
    preview: `video/1.mp4`,
  },

  {
    id: 2,
    title: `Casablanka`,
    genres: [`Comedy`, `Sci-Fi`, `Horror`],
    img: `img/bg-the-grand-budapest-hotel.jpg`,
    releaseDate: 2014,

    poster: `img/bg-the-grand-budapest-hotel.jpg`,
    rating: 7.8,
    ratingReviewsCount: 10,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
    story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
    director: `Director`,
    actors: [
      `Actor 1`,
      `Actor 2`,
      `Actor 3`,
      `Actor 4`,
      `Actor 5`,
    ],
    runTime: 200,
    preview: `video/1.mp4`,
  },

  {
    id: 3,
    title: `The Godfather`,
    genres: [`Comedy`, `Sci-Fi`, `Horror`],
    img: `img/bg-the-grand-budapest-hotel.jpg`,
    releaseDate: 2014,

    poster: `img/bg-the-grand-budapest-hotel.jpg`,
    rating: 7.8,
    ratingReviewsCount: 10,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
    story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
    director: `Director`,
    actors: [
      `Actor 1`,
      `Actor 2`,
      `Actor 3`,
      `Actor 4`,
      `Actor 5`,
    ],
    runTime: 200,
    preview: `video/1.mp4`,
  },
];

const PROMO_FILM = MOVIES[0];
const CATALOG_GENRE = ALL_GENRE;
const CATALOG_GENRES = [ALL_GENRE].concat(getGenresFromFilms(MOVIES));
const CATALOG_MOVIES = MOVIES.slice(0, CATALOG_FILMS_PER_PAGE_LIMIT);

const INITIAL_STATE = {

  currentFilm: undefined,
  promoFilm: PROMO_FILM,

  allFilms: CATALOG_MOVIES,
  catalogGenres: CATALOG_GENRES,
  catalogGenre: CATALOG_GENRE,
  showCount: 8,
};

const mockStore = configureStore([]);

it(`should be switch value of catalogGenre`, () => {

  const store = mockStore(Object.assign({}, INITIAL_STATE));
  const sample = Object.assign({}, INITIAL_STATE, {
    catalogGenre: `Comedy`,
    showCount: 8,
  });

  expect(reducer(store.getState(), {
    type: ActionType.SET_CATALOG_GENRE,
    payload: `Comedy`,
  }))
    .toEqual(sample);
});

it(`should be switch value of currentFilm`, () => {

  const store = mockStore(Object.assign({}, INITIAL_STATE));
  const sample = Object.assign({}, INITIAL_STATE, {currentFilm: MOVIES[0]});

  expect(reducer(store.getState(), {
    type: ActionType.SET_CURRENT_FILM,
    payload: MOVIES[0],
  }))
    .toEqual(sample);
});

it(`should be new movies added to movie catalog`, () => {

  const store = mockStore(Object.assign({}, INITIAL_STATE));
  const sample = Object.assign({}, INITIAL_STATE, {
    showCount: 16,
  });

  expect(reducer(store.getState(), {
    type: ActionType.GET_MORE_CATALOG_FILMS,
    payload: undefined,
  }))
    .toEqual(sample);
});

it(`calling 'setCurrentFilm' should be equal template`, () => {
  expect(ActionCreator.setCurrentFilm(MOVIES[0]))
    .toEqual({
      type: ActionType.SET_CURRENT_FILM,
      payload: MOVIES[0],
    });
});

it(`calling 'setCatalogGenre' should be equal template`, () => {
  expect(ActionCreator.setCatalogGenre(`Comedy`))
    .toEqual({
      type: ActionType.SET_CATALOG_GENRE,
      payload: `Comedy`,
    });
});

it(`calling 'getMoreCatalogFilms' should be equal template`, () => {
  expect(ActionCreator.getMoreCatalogFilms())
    .toEqual({
      type: ActionType.GET_MORE_CATALOG_FILMS,
      payload: undefined,
    });
});
