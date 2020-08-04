import {AuthorizationStatus, ActionType, ActionCreator, reducer, initialState} from "./user.js";

const userInfo = {
  id: 1,
  email: `test@mail.com`,
  name: `test`,
  avatarUrl: `https://instaturbo.ru/images/blog/5bbe622defe22.jpg`,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should get authorization info`, () => {
  expect(reducer({
    authorizationInfo: {
      id: 0,
      email: ``,
      name: ``,
      avatarUrl: ``,
    },
  }, {
    type: ActionType.GET_AUTHORIZATION_INFO,
    payload: userInfo
  })).toEqual({
    authorizationInfo: userInfo
  });
});

it(`Reducer should change sign in state`, () => {
  expect(reducer({
    isSignedIn: false,
  }, {
    type: ActionType.SIGN_IN,
    payload: true
  })).toEqual({
    isSignedIn: true
  });
});

it(`Reducer should get sign in error`, () => {
  expect(reducer({
    isSignInError: false,
  }, {
    type: ActionType.GET_SIGN_IN_ERROR,
    payload: true
  })).toEqual({
    isSignInError: true
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for requiring authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for getting authorization info returns correct action`, () => {
    expect(ActionCreator.getAuthorizationInfo(userInfo)).toEqual({
      type: ActionType.GET_AUTHORIZATION_INFO,
      payload: userInfo,
    });
  });

  it(`Action creator for signing in returns correct action`, () => {
    expect(ActionCreator.signIn(true)).toEqual({
      type: ActionType.SIGN_IN,
      payload: true,
    });
  });

  it(`Action creator for getting sign in error returns correct action`, () => {
    expect(ActionCreator.getSignInError(true)).toEqual({
      type: ActionType.GET_SIGN_IN_ERROR,
      payload: true,
    });
  });
});
