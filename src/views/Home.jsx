import React, {Component} from 'react';

import LoginText from '../components/auth/LoginText';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import TodoList from '../components/todo/TodoList';
import TodoListForm from '../components/todo/TodoListForm';

class Home extends Component {

  render() {
    return(
      <div className="container">
        <TodoList />
        <TodoListForm />

      </div>
    )
  }
}


export default (Home);
