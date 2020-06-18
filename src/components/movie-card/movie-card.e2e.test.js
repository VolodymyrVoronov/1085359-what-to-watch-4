import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

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
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`component should be hovered`, () => {

  const handleHover = jest.fn();
  const handleClick = jest.fn();

  const result = shallow(<MovieCard
    film={CURRENT_MOVIE}
    onHover={handleHover}
    onClick={handleClick}
  />);

  result
    .find(`.small-movie-card`)
    .simulate(`mouseEnter`);

  expect(handleHover).toHaveBeenCalledTimes(1);
});

it(`title should be clicked`, () => {

  const handleHover = jest.fn();
  const handleClick = jest.fn();

  const result = shallow(<MovieCard
    film={CURRENT_MOVIE}
    onHover={handleHover}
    onClick={handleClick}
  />);

  result
    .find(`.small-movie-card__link`)
    .simulate(`click`, {
      preventDefault() {}
    });

  expect(handleClick).toHaveBeenCalledTimes(1);
});
