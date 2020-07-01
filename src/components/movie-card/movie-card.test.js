import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const ID = 0;
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

const IS_PREVIEW_ACTIVE = false;
const HANDLE_EVENT = () => {};

it(`render should be match markup`, () => {

  const result = renderer
    .create(<MovieCard
      id={ID}
      film={CURRENT_MOVIE}
      isPreviewActive={IS_PREVIEW_ACTIVE}
      onHover={HANDLE_EVENT}
      onLeave={HANDLE_EVENT}
      onClick={HANDLE_EVENT}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(result).toMatchSnapshot();
});
