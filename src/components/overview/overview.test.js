import React from "react";
import renderer from "react-test-renderer";
import Overview from "./overview.jsx";

const CURRENT_MOVIE = {
  id: 0,
  title: `Citizen Kane`,
  genre: `Drama`,
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
  preview: ``,

  reviews: [
    {
      author: `John`,
      score: 5.1,
      text: `It's ok. but it could be better`,
      date: 1582590140667
    },
    {
      author: `Max`,
      score: 4.1,
      text: `It's ok. but it could be better`,
      date: 1582590140667
    },
    {
      author: `Stive`,
      score: 10,
      text: `It's ok. but it could be better`,
      date: 1582590140667
    },
    {
      author: `Stive`,
      score: 10,
      text: `It's ok. but it could be better`,
      date: 1582590140667
    }
  ]
};

it(`render should be match markup`, () => {

  const result = renderer
    .create(<Overview
      film={CURRENT_MOVIE}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
