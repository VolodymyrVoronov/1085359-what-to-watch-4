import {initialState, reducer, ActionType, ActionCreator} from "./app.js";
import {ALL_GENRE} from "../../components/const.js";

const filmCard =
  {
    id: 1,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49876816733_f1ba86707f_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
    genre: `Comedy`,
    releaseDate: 2018,
    description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
    rating: {
      score: 8.9,
      count: 240,
    },
    director: `David Yates`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: 123,
    isFavorite: false,
  };

const Genres = {
  DRAMA: `Drama`,
  COMEDY: `Comedy`,
  THRILLER: `Thriller`,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change current genre`, () => {
  expect(reducer({
    catalogGenre: ALL_GENRE,
  }, {
    type: ActionType.SET_CATALOG_GENRE,
    payload: Genres.DRAMA,
  })).toEqual({
    catalogGenre: Genres.DRAMA,
    showCount: 8,
  });

  expect(reducer({
    catalogGenre: Genres.THRILLER,
  }, {
    type: ActionType.SET_CATALOG_GENRE,
    payload: Genres.COMEDY,
  })).toEqual({
    catalogGenre: Genres.COMEDY,
    showCount: 8,
  });
});

it(`Reducer should show more film cards by button click`, () => {
  expect(reducer({
    showCount: 8,
  }, {
    type: ActionType.GET_MORE_CATALOG_FILMS,
    payload: 8,
  })).toEqual({
    showCount: 16,
  });
});

it(`Reducer should change current film card`, () => {
  expect(reducer({
    extraInfoFilm: null,
  }, {
    type: ActionType.GET_FILM_CARD,
    payload: filmCard,
  })).toEqual({
    extraInfoFilm: filmCard,
  });
});

it(`Reducer should toggle form state`, () => {
  expect(reducer({
    isFormDisabled: false,
  }, {
    type: ActionType.TOGGLE_FORM_STATE,
    payload: true,
  })).toEqual({
    isFormDisabled: true,
  });
});

it(`Reducer should toggle loading state`, () => {
  expect(reducer({
    isLoading: false,
  }, {
    type: ActionType.TOGGLE_LOADING_STATE,
    payload: true,
  })).toEqual({
    isLoading: true,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct genre`, () => {
    expect(ActionCreator.setCatalogGenre(Genres.COMEDY)).toEqual({
      type: ActionType.SET_CATALOG_GENRE,
      payload: Genres.COMEDY,
    });
  });

  it(`Action creator for showing more film cards returns correct film cards number`, () => {
    expect(ActionCreator.getMoreCatalogFilms()).toEqual({
      type: ActionType.GET_MORE_CATALOG_FILMS,
      payload: undefined,
    });
  });

  it(`Action creator for changing current film card returns correct object`, () => {
    expect(ActionCreator.getFilmCard(filmCard)).toEqual({
      type: ActionType.GET_FILM_CARD,
      payload: filmCard,
    });
  });

  it(`Action creator for toggling form state returns correct state`, () => {
    expect(ActionCreator.toggleFormState(false)).toEqual({
      type: ActionType.TOGGLE_FORM_STATE,
      payload: false,
    });
  });

  it(`Action creator for toggling loading state returns correct state`, () => {
    expect(ActionCreator.toggleLoadingState(false)).toEqual({
      type: ActionType.TOGGLE_LOADING_STATE,
      payload: false,
    });
  });
});
