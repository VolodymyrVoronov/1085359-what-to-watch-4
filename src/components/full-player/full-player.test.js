import React from "react";
import renderer from "react-test-renderer";
import FullPlayer from "./full-player.jsx";

export const CURRENT_MOVIE = {
  id: 0,
  title: `Citizen Kane`,
  genres: [`Documentary`, `Kids & Family`, `Romance`],
  img: `img/aviator.jpg`,
  releaseDate: 2014,

  poster: `img/aviator.jpg`,
  rating: 10,
  ratingReviewsCount: 120,
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
  story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis natus ipsa ut     possimus laudantium excepturi magni! Soluta doloribus facere quaerat, optio ab ratione quas provident nobis. Accusamus incidunt unde dicta.`,
  director: `Director`,
  actors: [`Actor 1`, `Actor 2`, `Actor 3`, `Actor 4`, `Actor 5`],
  runTime: 1260,
  preview: `http://img1.joyreactor.cc/pics/post/webm/%D0%B3%D0%B8%D1%84%D0%BA%D0%B8-%D1%84%D0%BE%D0%BA%D1%83%D1%81-%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%BA-%D0%A0%D0%B5%D0%B9%D0%BC%D0%BE%D0%BD%D0%B4-%D0%A2%D0%B5%D0%BB%D0%BB%D0%B5%D1%80-6063047.webm`,

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
    }
  ]
};
it(`Full Player should render correctly`, () => {
  const tree = renderer
    .create(<FullPlayer
      isPlaying={false}
      progress={10}
      duration={99}
      onPlayButtonClick={() => {}}
      onFullScreenButtonClick={() => {}}
      onExitButtonClick={() => {}}
      film={CURRENT_MOVIE}
    >
      <video />
    </FullPlayer>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
