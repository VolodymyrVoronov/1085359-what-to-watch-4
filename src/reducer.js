const initialState = {
  genreFilterIndex: 0,
};

export const ActionCreator = {
  applyGenreFilter: (genreFilterIndex) => {
    return {
      type: ActionType.APPLY_GENRE_FILTER,
      playload: genreFilterIndex,
    };
  },
};

export const ActionType = {
  APPLY_GENRE_FILTER: `APPLY_GENRE_FILTER`,
};

export const reducer = (state = initialState, action) => {
  if (action.type === ActionType.APPLY_GENRE_FILTER) {
    return Object.assign({}, state, {genreFilterIndex: action.playload});
  }
  return state;

  // switch (action.type) {
  //   case ActionType.APPLY_GENRE_FILTER:
  //     return Object.assign({}, state, {genreFilterIndex: action.playload});
  // }
  // return state;
};
