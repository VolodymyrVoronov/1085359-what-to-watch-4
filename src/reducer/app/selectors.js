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

export const getIsFullScreenOn = (state) => {
  return state[NameSpace.APP].isFullScreenOn;
};
