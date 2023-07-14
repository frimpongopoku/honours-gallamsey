import {
  DO_NOTHING,
  LOAD_FIREBASE_USER,
  LOAD_USER_LOCATIONS,
  TOGGLE_UNIVERSAL_MODAL,
  UPDATE_ERRAND_FORM,
} from '../redux-constants';

export const doNothingReducer = (state = [], action = {}) => {
  if (action.type === DO_NOTHING) {
    return action.payload;
  }
  return state;
};
export const reducerForErrandForm = (state = {}, action = {}) => {
  if (action.type === UPDATE_ERRAND_FORM) {
    return action.payload;
  }
  return state;
};
export const reducerForUniversalModal = (state = {}, action = {}) => {
  if (action.type === TOGGLE_UNIVERSAL_MODAL) {
    return action.payload;
  }
  return state;
};
export const reducerToLoadFirebaseUser = (state = {}, action = {}) => {
  if (action.type === LOAD_FIREBASE_USER) {
    return action.payload;
  }
  return state;
};
export const reducerToLoadUserLocations = (state = [], action = {}) => {
  if (action.type === LOAD_USER_LOCATIONS) {
    return action.payload;
  }
  return state;
};
