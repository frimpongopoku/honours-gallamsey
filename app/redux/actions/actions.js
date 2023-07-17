import {apiCall} from '../../api/messenger.js';
import {CREATE_ERRAND_URL} from '../../api/urls.js';
import {signoutOfFirebase} from '../../firebase/utils.js';
import {
  DO_NOTHING,
  LOAD_FIREBASE_USER,
  LOAD_USER_LOCATIONS,
  SET_ERRORS,
  SET_USER_PREFERENCES,
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
  console.log('Its happening here', data);
  return {type: TOGGLE_UNIVERSAL_MODAL, payload: data};
};
export const loadFirebaseUserAction = data => {
  return {type: LOAD_FIREBASE_USER, payload: data};
};
export const firebaseSignOutAction = () => dispatch => {
  signoutOfFirebase();
  dispatch(loadFirebaseUserAction(null));
};

export const updateUserLocationAction = data => {
  return {type: LOAD_USER_LOCATIONS, payload: data};
};
export const setUserPreferencesAction = data => {
  return {type: SET_USER_PREFERENCES, payload: data};
};
export const setErrorsAction = data => {
  return {type: SET_ERRORS, payload: data};
};

const validateFormContent = data => {
  const errors = {};
  const {title, description, cost, reward} = data;

  if (!title) errors.title = 'Please provide a valid title';
  if (!description) errors.description = 'Please provide a valid description';
  if (!cost) errors.cost = 'Please provide a valid cost of errand';
  if (!reward) errors.reward = 'Compensation value should be 10 GHS or more';
  return {hasErrors: Object.keys(errors).length, errors};
};

export const sendErrandsToBackend = (data, options, cb) => dispatch => {
  const {allErrors} = options || {};
  const {hasErrors, errors} = validateFormContent(data);
  if (hasErrors)
    return dispatch(setErrorsAction({...allErrors, errandForm: errors}));
  dispatch(setErrorsAction({...allErrors, errandForm: {}}));
  data = {
    ...data,
    poster: {id: 'some-random-id-from-poster', name: 'SeniorUserFromPhone'},
  };
  apiCall(CREATE_ERRAND_URL, {body: data}, response => {
    cb && cb(response);
  });
};
