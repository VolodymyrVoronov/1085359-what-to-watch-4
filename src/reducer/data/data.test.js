import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {initialState, reducer, ActionType, Operation} from "./data.js";
import {createFilm, createFilms} from "../../adapter.js";

const api = createAPI(() => {});

const PROMO_FILM = {
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

const FILMS = [
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

const testReviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `December 24, 2016`,
    rating: 8.9,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: `Bill Goodykoontz`,
    },
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: `Amanda Greever`,
    },
    comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: `Matthew Lickona`,
    },
    comment: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    date: `December 20, 2016`,
    rating: 7.2,
  },
  {
    id: 5,
    user: {
      id: 5,
      name: `Paula Fleri-Soler`,
    },
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: `December 20, 2016`,
    rating: 7.6,
  },
  {
    id: 6,
    user: {
      id: 6,
      name: `Paula Fleri-Soler`,
    },
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: `December 20, 2016`,
    rating: 7.0,
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should load films`, () => {
  expect(reducer({
    films: [],
  }, {
    type: ActionType.LOAD_FILMS,
    payload: FILMS,
  })).toEqual({
    films: FILMS,
  });
});

it(`Reducer should load promo movie`, () => {
  expect(reducer({
    promoFilm: {},
  }, {
    type: ActionType.LOAD_PROMO_FILM,
    payload: PROMO_FILM,
  })).toEqual({
    promoFilm: PROMO_FILM,
  });
});

it(`Reducer should load reviews`, () => {
  expect(reducer({
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: testReviews,
  })).toEqual({
    reviews: testReviews,
  });
});

it(`Reducer should catch errors`, () => {
  expect(reducer({
    isError: false,
  }, {
    type: ActionType.CATCH_ERROR,
    payload: true,
  })).toEqual({
    isError: true,
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadFilms();

    apiMock
    .onGet(`/films`)
    .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_FILMS,
          payload: createFilms([{fake: true}]),
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadPromoFilm();

    apiMock
    .onGet(`/films/promo`)
    .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_PROMO_FILM,
          payload: createFilm([{fake: true}]),
        });
      });
  });

  it(`Should make a correct API call to /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadReviews(1);

    apiMock
    .onGet(`/comments/1`)
    .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });
});
