import {createAPI} from "../../api.js";
import MockAdapter from "axios-mock-adapter";
import {AuthorizationStatus, ActionType, ActionCreator, reducer, initialState, Operation} from "./user.js";
import {createAuthorizationInfo} from "../../authInfo.js";

const userInfo = {
  id: 1,
  email: `test@mail.com`,
  name: `test`,
  avatarUrl: `/wtw/static/avatar/5.jpg`,
};

const authInfo = {
  email: `test@gmail.com`,
  password: `123`,
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

  it(`Action creator for getting sign in error returns correct action`, () => {
    expect(ActionCreator.getSignInError(true)).toEqual({
      type: ActionType.GET_SIGN_IN_ERROR,
      payload: true,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should check authorization`, () => {
    const api = createAPI(() => {});

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return checkAuthorization(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.REQUIRE_AUTHORIZATION,
              payload: `AUTH`,
            });
          });
  });

  it(`Should post authorization info`, function () {
    const api = createAPI(() => {});

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login(authInfo);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.GET_AUTHORIZATION_INFO,
          payload: createAuthorizationInfo({fake: true}),
        });
      });
  });
});
