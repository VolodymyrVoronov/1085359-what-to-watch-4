export const ALL_GENRE = `All genres`;
const COMEDY_GENRE = `Comedy`;
const CRIME_GENRE = `Crime`;
const DOCUMENTARY_GENRE = `Documentary`;
const DRAMA_GENRE = `Drama`;
const HORROR_GENRE = `Horror`;
const KIDS_AND_FAMILY_GENRE = `Kids & Family`;
const ROMANCE_GENRE = `Romance`;
const SCI_FI_GENRE = `Sci-Fi`;
const THRILLER_GENRE = `Thriller`;

export const GENRES = [
  COMEDY_GENRE,
  CRIME_GENRE,
  DOCUMENTARY_GENRE,
  DRAMA_GENRE,
  HORROR_GENRE,
  KIDS_AND_FAMILY_GENRE,
  ROMANCE_GENRE,
  SCI_FI_GENRE,
  THRILLER_GENRE,
];

export const GENRE_ALIASES = {
  [COMEDY_GENRE]: `Comedies`,
  [DRAMA_GENRE]: `Dramas`,
  [THRILLER_GENRE]: `Thrillers`,
};

export const SERVER_URL = `https://4.react.pages.academy/wtw`;
export const SERVER_RESPONSE_TIMEOUT = 5000;
export const SERVER_USE_COOKIES = true;
export const ServerErrors = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

export const AppPages = {
  MAIN: `/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  MOVIES: `/films`,
  PLAYER: `/player`,
};