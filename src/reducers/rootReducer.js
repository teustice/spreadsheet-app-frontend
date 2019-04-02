import { combineReducers } from 'redux';

import currentUser from './currentUser';
import {
  todos,
  deleteTodo,
  deleteTodoBatch,
  createTodo,
  createTodoBatch
} from './todos';
import {
  users
} from './users';

export default combineReducers({
  currentUser,
  todos,
  deleteTodo,
  deleteTodoBatch,
  createTodo,
  createTodoBatch,
  users
})
