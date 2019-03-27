import { combineReducers } from 'redux';

import currentUser from './currentUser';
import {
  todos,
  deleteTodo,
  createTodo
} from './todos';
import {
  users
} from './users';

export default combineReducers({
  currentUser,
  todos,
  deleteTodo,
  createTodo,
  users
})
