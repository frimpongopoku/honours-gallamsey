import {combineReducers} from 'redux';
import {
  doNothingReducer,
  reducerForErrandForm,
  reducerForUniversalModal,
  reducerToLoadFirebaseUser,
} from './reducers';

export default combineReducers({
  testStore: doNothingReducer,
  errandForm: reducerForErrandForm,
  modal: reducerForUniversalModal,
  fireAuth: reducerToLoadFirebaseUser,
});
