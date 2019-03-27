import React, {Component} from 'react';

import LoginText from '../components/auth/LoginText';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

class Signin extends Component {

  render() {
    return(
      <div className="container">
        <LoginText />
        <LoginForm history={this.props.history}/>
        <SignupForm history={this.props.history}/>
      </div>
    )
  }
}


export default (Signin);
