import {LOADING} from '../../pages/authentication/constants';
import {
  DO_NOTHING,
  LOAD_FIREBASE_USER,
  LOAD_USER_LOCATIONS,
  SET_ERRORS,
  SET_GALLAMSEY_USER,
  SET_USER_PREFERENCES,
  TOGGLE_UNIVERSAL_MODAL,
  UPDATE_ERRAND_FORM,
} from '../redux-constants';

export const doNothingReducer = (state = [], action = {}) => {
  if (action.type === DO_NOTHING) {
    return action.payload;
  }
  return state;
};
export const reducerForErrors = (state = {}, action = {}) => {
  if (action.type === SET_ERRORS) {
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

export const reducerToSetGallamseyUser = (state = LOADING, action = {}) => {
  if (action.type === SET_GALLAMSEY_USER) {
    return action.payload;
  }
  return state;
};
export const reducerToLoadFirebaseUser = (state = LOADING, action = {}) => {
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
export const reducerToSetUserPreferences = (state = {}, action = {}) => {
  if (action.type === SET_USER_PREFERENCES) {
    return action.payload;
  }
  return state;
};
