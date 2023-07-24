import {apiCall} from '../../api/messenger.js';
import {
  ALL_ERRANDS,
  CREATE_ERRAND_URL,
  FIND_USER_PROFILE,
  MY_OWN_ERRANDS_URL,
  NEWS_FEED_URL,
  RUNNING_ERRANDS_URL,
} from '../../api/urls.js';
import {signoutOfFirebase} from '../../firebase/utils.js';
import {uploadImageToFirebase} from '../../utils/index.js';
import {
  DO_NOTHING,
  LOAD_FIREBASE_USER,
  LOAD_NEWS,
  LOAD_USER_LOCATIONS,
  SET_ERRORS,
  SET_GALLAMSEY_USER,
  SET_USER_PREFERENCES,
  TOGGLE_UNIVERSAL_MODAL,
  UPDATE_ERRAND_FORM,
  YOUR_POSTS,
  YOUR_RUNNING_ERRANDS,
} from '../redux-constants.js';

export const testReduxAction = someValue => {
  return {type: DO_NOTHING, payload: someValue};
};
export const loadNewsAction = value => {
  return {type: LOAD_NEWS, payload: value};
};
export const updateErrandFormAction = data => {
  return {type: UPDATE_ERRAND_FORM, payload: data};
};
export const toggleUniversalModal = data => {
  return {type: TOGGLE_UNIVERSAL_MODAL, payload: data};
};
export const loadUsersRunningErrandAction = data => {
  return {type: YOUR_RUNNING_ERRANDS, payload: data};
};
export const loadUsersErrandPostsAction = data => {
  return {type: YOUR_POSTS, payload: data};
};
export const loadFirebaseUserAction = data => {
  return {type: LOAD_FIREBASE_USER, payload: data};
};
export const firebaseSignOutAction = () => dispatch => {
  signoutOfFirebase();
  dispatch(loadFirebaseUserAction(null));
};

export const fetchMyPosts = (user, cb) => dispatch => {
  apiCall(MY_OWN_ERRANDS_URL, {body: {user_id: user?._id}}, response => {
    cb && cb();

    if (!response.success)
      console.log('COULD NOT LOAD YOUR POSTED ERRANDS....');

    dispatch(loadUsersErrandPostsAction(response.data));
  });
};
export const fetchMyRunningErrands = (user, cb) => dispatch => {
  apiCall(RUNNING_ERRANDS_URL, {body: {user_id: user?._id}}, response => {
    cb && cb();
    if (!response.success)
      console.log('COULD NOT LOAD YOUR RUNNING ERRANDS....');

    dispatch(loadUsersRunningErrandAction(response.data));
  });
};
export const fetchNewsFeed = (user, cb) => dispatch => {
  apiCall(NEWS_FEED_URL, {body: {user_id: user?._id}}, response => {
    cb && cb();
    if (!response.success) {
      console.log('Where is the response', response);
      console.log('COULD NOT LOAD NEWS FEED');
    }

    dispatch(loadNewsAction(response.data));
  });
};
export const findUserProfile = body => dispatch => {
  apiCall(FIND_USER_PROFILE, {body: {email: body}}, response => {
    if (!response.success) {
      console.log('ERROR LOADING GALLAMSEY USER: ', response.error);
      // return dispatch(setGallamseyUser(null));
    }
    dispatch(setGallamseyUser(response.data));
    dispatch(fetchNewsFeed(response.data));
    dispatch(fetchMyRunningErrands(response.data));
    dispatch(fetchMyPosts(response.data));
  });
};
export const setGallamseyUser = data => {
  return {type: SET_GALLAMSEY_USER, payload: data};
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
  // data = {
  //   ...data,
  //   // poster: {id: 'some-random-id-from-poster', name: 'SeniorUserFromPhone'},
  // };
  uploadImageToFirebase(data?.images, {collectionName: 'errands'}, url => {
    const urls = [url];
    apiCall(CREATE_ERRAND_URL, {body: {...data, images: urls}}, response => {
      cb && cb(response);
    });
  });
};
