import {ActionCreator, ActionType, reducer} from './reducer.js';

it(`should be equal initial state`, () => {
  expect(reducer(void 0, {}))
    .toEqual({
      genreFilterIndex: 0,
    });
});

it(`should be switch value of genre filter`, () => {
  expect(reducer(void 0, {
    type: ActionType.APPLY_GENRE_FILTER,
    playload: 2,
  }))
    .toEqual({
      genreFilterIndex: 2,
    });
});

it(`calling apply genre filter should be equal template`, () => {
  expect(ActionCreator.applyGenreFilter(3))
    .toEqual({
      type: ActionType.APPLY_GENRE_FILTER,
      playload: 3,
    });
});
