import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAuthorizationInfo = (state) => {
  return state[NAME_SPACE].authorizationInfo;
};

export const getIsSignedIn = (state) => {
  return state[NAME_SPACE].isSignedIn;
};

export const getIsSignInError = (state) => {
  return state[NAME_SPACE].isSignInError;
};


