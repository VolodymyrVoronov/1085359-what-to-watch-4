import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Catalog from './catalog.jsx';
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

const HANDLE_CLICK = () => {};
const CATALOG_FILMS_PER_PAGE_LIMIT = 8;

const GENRES = [`Drama`, `Comedy`, `Kids & Family`];
const CURRENT_GENRE = GENRES[1];

const mockStore = configureStore([]);

it(`render should be match markup`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      films,
    },
    [NameSpace.APP]: {
      showCount: CATALOG_FILMS_PER_PAGE_LIMIT,
      genres: GENRES,
      catalogGenre: `All genres`,
      hasMoreFilmsItem: false,
    },
  });

  const result = renderer
    .create(<Provider store={store}>
      <Catalog
        films={films}
        genres={GENRES}
        currentGenre={CURRENT_GENRE}
        onShowMore={HANDLE_CLICK}
        onFilmListItemClick={HANDLE_CLICK}
        hasMoreFilmsItem={false}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(result).toMatchSnapshot();
});
