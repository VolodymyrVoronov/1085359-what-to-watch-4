import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space.js';

const CURRENT_MOVIE = {
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

const userInfo = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatarUrl: `https://instaturbo.ru/images/blog/5bbe622defe22.jpg`,
};

const mockStore = configureStore([]);

it(`AddReview should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      isError: false,
    },
    [NameSpace.APP]: {
      isFormDisabled: false,
    },
  });

  const result = renderer
    .create(
        <Provider store={store}>
          <AddReview
            authorizationStatus={`AUTH`}
            authInfo={userInfo}
            onSignInClick={() => {}}
            film={CURRENT_MOVIE}
            onRatingChange={() => {}}
            onReviewChange={() => {}}
            onReviewFormSubmit={() => {}}
            isSubmitButtonDisabled={false}
            isError={false}
            isFormDisabled={false}
          />
        </Provider>)
    .toJSON();

  expect(result).toMatchSnapshot();
});
