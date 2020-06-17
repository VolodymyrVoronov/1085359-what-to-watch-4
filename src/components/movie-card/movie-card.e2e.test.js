import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const CURRENT_MOVIE = {
  id: 0,
  title: `Citizen Kane`,
  genre: `Drama`,
  img: `img/bg-the-grand-budapest-hotel.jpg`,
  releaseDate: 2014
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
    onTitleClickHandler={handleClick}
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
    onTitleClickHandler={handleClick}
  />);

  result
    .find(`.small-movie-card__link`)
    .simulate(`click`, {
      preventDefault() {}
    });

  expect(handleClick).toHaveBeenCalledTimes(1);
});
