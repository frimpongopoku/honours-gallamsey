import {signoutOfFirebase} from '../../firebase/utils.js';
import {
  DO_NOTHING,
  LOAD_FIREBASE_USER,
  LOAD_USER_LOCATIONS,
  TOGGLE_UNIVERSAL_MODAL,
  UPDATE_ERRAND_FORM,
} from '../redux-constants.js';

export const testReduxAction = someValue => {
  return {type: DO_NOTHING, payload: someValue};
};
export const updateErrandFormAction = data => {
  return {type: UPDATE_ERRAND_FORM, payload: data};
};
export const toggleUniversalModal = data => {
  return {type: TOGGLE_UNIVERSAL_MODAL, payload: data};
};
export const loadFirebaseUserAction = data => {
  return {type: LOAD_FIREBASE_USER, payload: data};
};
export const firebaseSignOutAction = () => dispatch => {
  signoutOfFirebase();
  loadFirebaseUserAction(null);
};

export const updateUserLocationAction = data => {
  return {type: LOAD_USER_LOCATIONS, payload: data};
};
