export const createFilm = (film) => {

  return {
    id: film.id,
    previewImage: film.preview_image,
    previewVideo: film.preview_video_link,
    videoLink: film.video_link,
    title: film.name,
    backgroundImage: film.background_image,
    backgroundColor: film.background_color,
    poster: film.poster_image,
    genre: film.genre,
    releaseDate: film.released,
    description: film.description,
    rating: {
      score: film.rating,
      count: film.scores_count,
    },
    director: film.director,
    actors: film.starring,
    runtime: film.run_time,
    isFavorite: film.is_favorite,
  };
};

export const createFilms = (films) => {
  return films.map((film) => createFilm(film));
};
