import React, {Component} from 'react';

import LoginText from '../components/auth/LoginText';
import LoginForm from '../components/auth/LoginForm';
import TodoList from '../components/todo/TodoList';
import TodoListForm from '../components/todo/TodoListForm';

class AdminDashboard extends Component {

  render() {
    return(
      <div className="container">
        <LoginText />
        <LoginForm history={this.props.history}/>

        <TodoList />
        <TodoListForm />

      </div>
    )
  }
}


export default (AdminDashboard);
