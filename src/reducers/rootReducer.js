import { combineReducers } from 'redux';

import simpleReducer from './simpleReducer';
import updateTextReducer from './updateTextReducer';
import fetchReducer from './fetchReducer';

export default combineReducers({
  simpleReducer,
  updateTextReducer,
  fetchReducer
})
