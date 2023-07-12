import {combineReducers} from 'redux';
import {doNothingReducer, reducerForErrandForm} from './reducers';

export default combineReducers({
  testStore: doNothingReducer,
  errandForm: reducerForErrandForm,
});
