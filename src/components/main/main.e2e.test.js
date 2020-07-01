import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MovieCard from "./../movie-card/movie-card.jsx";
import Main from "./main.jsx";

const CURRENT_MOVIE = {
  id: 0,
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

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

it(`movie card title should be clicked`, () => {

  const handleClick = jest.fn();

  const store = mockStore({
    genreFilterIndex: 0,
  });

  const result = mount(<Provider store={store}>
    <Main
      currentMovie={CURRENT_MOVIE}
      films={MOVIES}
      onMovieListItemClick={handleClick}
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
