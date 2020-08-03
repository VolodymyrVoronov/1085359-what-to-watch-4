import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const ID = 0;
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
