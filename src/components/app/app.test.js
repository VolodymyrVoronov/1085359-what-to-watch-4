import React from "react";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";

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

const GENRES = [`Comedy`, `Sci-Fi`, `Horror`];
const CURRENT_GENRE = GENRES[0];
const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

const mockStore = configureStore([]);

it(`render should be match markup`, () => {

  const store = mockStore({
    promoFilm: MOVIES[0],
    catalogGenres: GENRES,
    catalogGenre: CURRENT_GENRE,
    allFilms: MOVIES,
    showCount: CATALOG_FILMS_PER_PAGE_LIMIT,
  });

  const result = renderer
    .create(<Provider store={store}>
      <App
        promoFilm={MOVIES[0]}
        films={MOVIES}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(result).toMatchSnapshot();
});
