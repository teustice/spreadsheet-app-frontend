import { combineReducers } from 'redux';

import currentUser from './currentUser';
import {
  todos,
  deleteTodo,
  createTodo
} from './todos';

export default combineReducers({
  currentUser,
  todos,
  deleteTodo,
  createTodo
})
