import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const ID = 0;
const IS_ACTIVE = false;
const CURRENT_MOVIE = {
  id: 1,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `The Grand Budapest Hotel`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  description: `The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson, which explores tragedy, war, fascism, nostalgia, friendship, and loyalty.`,
  rating: {
    score: 9.3,
    count: 250,
  },
  director: `Wes Anderson`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: 200,
  isFavorite: false,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`component should be hovered`, () => {

  const handleHover = jest.fn();
  const handleClick = jest.fn();
  const handleLeave = jest.fn();

  const result = shallow(<MovieCard
    id={ID}
    isPreviewActive={IS_ACTIVE}
    film={CURRENT_MOVIE}
    onHover={handleHover}
    onClick={handleClick}
    onLeave={handleLeave}
  />);

  result
    .find(`.small-movie-card`)
    .simulate(`mouseEnter`);

  expect(handleHover).toHaveBeenCalledTimes(1);
});

it(`component should be leaved`, () => {

  const handleHover = jest.fn();
  const handleClick = jest.fn();
  const handleLeave = jest.fn();

  const result = shallow(<MovieCard
    id={ID}
    isPreviewActive={IS_ACTIVE}
    film={CURRENT_MOVIE}
    onHover={handleHover}
    onClick={handleClick}
    onLeave={handleLeave}
  />);

  result
    .find(`.small-movie-card`)
    .simulate(`mouseLeave`);

  expect(handleLeave).toHaveBeenCalledTimes(1);
});

it(`title should be clicked`, () => {

  const handleHover = jest.fn();
  const handleClick = jest.fn();
  const handleLeave = jest.fn();

  const result = shallow(<MovieCard
    id={ID}
    isPreviewActive={IS_ACTIVE}
    film={CURRENT_MOVIE}
    onHover={handleHover}
    onClick={handleClick}
    onLeave={handleLeave}
  />);

  result
    .find(`.small-movie-card`)
    .simulate(`click`, {
      preventDefault() {}
    });

  expect(handleClick).toHaveBeenCalledTimes(1);
});
