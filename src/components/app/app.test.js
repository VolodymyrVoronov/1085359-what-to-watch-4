import React from "react";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from '../../reducer/name-space.js';

const films = [
  {
    id: 1,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49876816733_f1ba86707f_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
    genre: `Fantasy`,
    releaseDate: 2018,
    description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
    rating: {
      score: 8.9,
      count: 240,
    },
    director: `David Yates`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: 200,
    isFavorite: false,
  },
  {
    id: 2,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Bohemian Rhapsody`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49768198796_957c97bc00_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_50001660108_922f0950ea_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 2018,
    description: `A British-American venture, the film was produced by 20th Century Fox, Regency Enterprises, GK Films, and Queen Films, with Fox serving as distributor. The film follows the singer's life from the formation of the band up to their 1985 Live Aid performance at the original Wembley Stadium.`,
    rating: {
      score: 9.0,
      count: 250,
    },
    director: `Bryan Singer`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: 200,
    isFavorite: false,
  },
];

const reviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2020-07-19T16:06:01.831Z`,
    rating: 8.9,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: `Bill Goodykoontz`,
    },
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `2020-07-19T16:06:01.831Z`,
    rating: 8.0,
  },
];

const userInfo = {
  id: 1,
  email: `test@mail.com`,
  name: `test`,
  avatarUrl: `https://instaturbo.ru/images/blog/5bbe622defe22.jpg`,
};

const HANDLE_CLICK = () => {};

const mockStore = configureStore([]);

it(`render should be match markup`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      promoFilm: films[1],
      films,
      reviews,
    },
    [NameSpace.APP]: {
      currentMovieCard: films[0],
      isFullScreenOn: false,
      isError: false,
      isLoading: false,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authorizationInfo: {userInfo},
      isSignedIn: false,
      isSignInError: false,
    }
  });

  const result = renderer
    .create(<Provider store={store}>
      <App
        promoFilm={films[1]}
        films={films}
        favoriteFilms={films}
        isFullScreenOn={false}
        onPlayButtonClick={HANDLE_CLICK}
        authInfo={userInfo}
        isSignedIn={false}
        authorizationStatus={`AUTH`}
        onSignInClick={HANDLE_CLICK}
        isLoading={false}
        onFilmListItemClick={HANDLE_CLICK}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(result).toMatchSnapshot();
});
