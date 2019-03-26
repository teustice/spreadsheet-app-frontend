import React, {Component} from 'react';

import LoginText from '../components/LoginText';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import TodoList from '../components/TodoList';
import TodoListForm from '../components/TodoListForm';

class Home extends Component {

  render() {
    return(
      <div className="container">
        <LoginText />
        <LoginForm history={this.props.history}/>
        <SignupForm />

        <TodoList />
        <TodoListForm />

      </div>
    )
  }
}


export default (Home);
