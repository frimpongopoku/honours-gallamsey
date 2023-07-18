import {combineReducers} from 'redux';
import {
  doNothingReducer,
  reducerForErrandForm,
  reducerForErrors,
  reducerForUniversalModal,
  reducerToLoadFirebaseUser,
  reducerToLoadUserLocations,
  reducerToSetGallamseyUser,
  reducerToSetUserPreferences,
} from './reducers';

export default combineReducers({
  testStore: doNothingReducer,
  errandForm: reducerForErrandForm,
  modal: reducerForUniversalModal,
  fireAuth: reducerToLoadFirebaseUser,
  userLocations: reducerToLoadUserLocations,
  userPreferences: reducerToSetUserPreferences,
  errors: reducerForErrors,
  user: reducerToSetGallamseyUser,
});
