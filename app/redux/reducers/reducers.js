import {DO_NOTHING, UPDATE_ERRAND_FORM} from '../redux-constants';

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
