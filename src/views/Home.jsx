import React, {Component} from 'react';
import { connect } from 'react-redux';

import LoginText from '../components/LoginText';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import TodoList from '../components/TodoList';
import TodoListForm from '../components/TodoListForm';
import { setCurrentUser } from '../actions/setCurrentUser'

class Home extends Component {

  render() {
    return(
      <div className="container">
        <LoginText />
        <LoginForm />
        <SignupForm />

        {this.props.currentUser &&
          <TodoList />
        }
        {this.props.currentUser &&
          <TodoListForm />
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 setCurrentUser: (val) => dispatch(setCurrentUser(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
