import NameSpace from "../name-space.js";

export const getGenre = (state) => {
  return state[NameSpace.APP].catalogGenre;
};

export const getShownFilmCards = (state) => {
  return state[NameSpace.APP].showCount;
};

export const getCurrentFilmCard = (state) => {
  return state[NameSpace.APP].extraInfoFilm;
};

export const getIsReviewOpen = (state) => {
  return state[NameSpace.APP].isReviewOpen;
};

export const getIsFormDisabled = (state) => {
  return state[NameSpace.APP].isFormDisabled;
};

export const getIsLoading = (state) => {
  return state[NameSpace.APP].isLoading;
};
