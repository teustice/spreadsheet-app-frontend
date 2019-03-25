import React, {Component} from 'react';
import { connect } from 'react-redux';

import LoginText from '../components/LoginText';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import TodoList from '../components/TodoList';
import { updateText } from '../actions/updateText'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount() {
    if(localStorage.getItem('currentUser')) {
      this.setState({currentUser: JSON.parse(localStorage.getItem('currentUser'))})
    }
  }

  setCurrentUser(user) {
    this.setState({currentUser: user})
  }

  resetCurrentUser() {
    this.setState({currentUser: undefined})
    localStorage.removeItem('currentUser')
  }

  render() {
    return(
      <div className="container">
        <LoginText
            setCurrentUser={this.setCurrentUser.bind(this)}
            currentUser={this.state.currentUser}
        />
        <LoginForm
            setCurrentUser={this.setCurrentUser.bind(this)}
            currentUser={this.state.currentUser}
            resetCurrentUser={this.resetCurrentUser.bind(this)}
        />
        {!this.state.currentUser &&
          <SignupForm
              setCurrentUser={this.setCurrentUser.bind(this)}
              currentUser={this.state.currentUser}
              resetCurrentUser={this.resetCurrentUser.bind(this)}
          />
        }
        {this.state.currentUser &&
          <TodoList currentUser={this.state.currentUser}/>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 updateText: (val) => dispatch(updateText(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
