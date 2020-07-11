import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MovieCard from "./../movie-card/movie-card.jsx";
import Main from "./main.jsx";

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

const CURRENT_FILM = MOVIES[0];
const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

const GENRES = [`Comedy`, `Sci-Fi`, `Horror`];
const CURRENT_GENRE = GENRES[0];

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

it(`movie card title should be clicked`, () => {

  const handleClick = jest.fn();

  const store = mockStore({
    promoFilm: MOVIES[0],
    catalogGenres: GENRES,
    catalogGenre: CURRENT_GENRE,
    allFilms: MOVIES,
    showCount: CATALOG_FILMS_PER_PAGE_LIMIT,
  });

  const result = mount(<Provider store={store}>
    <Main
      promoFilm={CURRENT_FILM}
      onFilmListItemClick={handleClick}
    />
  </Provider>);

  result
    .find(MovieCard)
    .forEach((value) => {
      value
        .find(`.small-movie-card`)
        .simulate(`click`);
    });

  expect(handleClick).toHaveBeenCalledTimes(MOVIES.length);
});
