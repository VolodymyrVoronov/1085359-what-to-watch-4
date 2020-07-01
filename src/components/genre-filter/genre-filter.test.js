import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import GenreFilter from './genre-filter.jsx';

const GENRES = [`Comedy`, `Sci-Fi`, `Horror`];

const mockStore = configureStore([]);

it(`render should be match markup`, () => {

  const store = mockStore({
    genreFilterIndex: 0,
  });

  const result = renderer
    .create(<Provider store={store}>
      <GenreFilter
        genres={GENRES}
      />
    </Provider>)
    .toJSON();

  expect(result).toMatchSnapshot();
});
