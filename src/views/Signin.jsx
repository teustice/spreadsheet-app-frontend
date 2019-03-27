import React, {Component} from 'react';

import LoginText from '../components/auth/LoginText';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      signup: false
    }
  }

  render() {
    return(
      <div className="container">
        <LoginText />
        {this.state.signup ?
          <SignupForm history={this.props.history}/> :
          <LoginForm history={this.props.history}/>
        }
        <button class="btn btn-sm" onClick={() => this.setState({signup: !this.state.signup})}>
          {this.state.signup ? 'log in' : 'sign up'}
        </button>
      </div>
    )
  }
}


export default (Signin);
