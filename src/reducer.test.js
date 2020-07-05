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
    title: `movie 1`,
    genres: [`Drama`],
    year: 2014,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    frames: [`img/the-grand-budapest-hotel-poster.jpg`],
    ratingScore: 8.9,
    ratingReviewsCount: 240,
    preview: `./samples/sintel_trailer-480p.mp4`,
    description: `description`,
    story: `story`,
    director: `Wes Andreson`,
    duration: 99,
    actors: [
      `Some Actor 1`,
      `Some Actor 2`,
    ],
    reviews: [
      {
        author: `Some Reviewer`,
        score: 8.2,
        text: `Awesome text for The Grand Budapest Hotel...`,
        date: 1582590140667,
      }
    ]
  },
  {
    title: `movie 2`,
    genres: [`Comedy`],
    year: 2014,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    frames: [`img/the-grand-budapest-hotel-poster.jpg`],
    ratingScore: 8.9,
    ratingReviewsCount: 240,
    preview: `./samples/sintel_trailer-480p.mp4`,
    description: `description`,
    story: `story`,
    director: `Wes Andreson`,
    duration: 99,
    actors: [
      `Some Actor 1`,
      `Some Actor 2`,
    ],
    reviews: [
      {
        author: `Some Reviewer`,
        score: 8.2,
        text: `Awesome text for The Grand Budapest Hotel...`,
        date: 1582590140667,
      }
    ]
  },
  {
    title: `movie 3`,
    genres: [`Kids & Family`],
    year: 2014,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    frames: [`img/the-grand-budapest-hotel-poster.jpg`],
    ratingScore: 8.9,
    ratingReviewsCount: 240,
    preview: `./samples/sintel_trailer-480p.mp4`,
    description: `description`,
    story: `story`,
    director: `Wes Andreson`,
    duration: 99,
    actors: [
      `Some Actor 1`,
      `Some Actor 2`,
    ],
    reviews: [
      {
        author: `Some Reviewer`,
        score: 8.2,
        text: `Awesome text for The Grand Budapest Hotel...`,
        date: 1582590140667,
      }
    ]
  },
];

const PROMO_FILM = MOVIES[0];
const CATALOG_GENRE = ALL_GENRE;
const CATALOG_GENRES = [ALL_GENRE].concat(getGenresFromFilms(MOVIES));
const CATALOG_MOVIES = MOVIES.slice(0, CATALOG_FILMS_PER_PAGE_LIMIT);
const HAS_MORE_CATALOG_MOVIES = MOVIES.length > CATALOG_FILMS_PER_PAGE_LIMIT;

const INITIAL_STATE = {

  currentFilm: undefined,
  promoFilm: PROMO_FILM,

  allFilms: CATALOG_MOVIES,
  catalogGenres: CATALOG_GENRES,
  catalogGenre: CATALOG_GENRE,
  catalogFilms: CATALOG_MOVIES,
  hasMoreСatalogFilms: HAS_MORE_CATALOG_MOVIES,
};

const mockStore = configureStore([]);

it(`should be switch value of catalogGenre`, () => {

  const store = mockStore(Object.assign({}, INITIAL_STATE));
  const sample = Object.assign({}, INITIAL_STATE, {
    catalogGenre: `Comedy`,
    catalogFilms: [MOVIES[1]],
    hasMoreСatalogFilms: false,
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
    catalogFilms: MOVIES.slice(0, 2 * CATALOG_FILMS_PER_PAGE_LIMIT),
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
