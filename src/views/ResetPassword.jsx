import React, {Component} from 'react';

import LoginText from '../components/auth/LoginText';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

class ResetPassword extends Component {
  constructor() {
    super()
    this.state = {
      user: undefined
    }
  }

  componentDidMount() {
    if(this.props.match.params.token) {
      let token = this.props.match.params.token;

      // fetch(`${apiUrl}/users/forgot`, {
      //     method: 'POST',
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(body)
      // })
      //     .then(function(res) {
      //       console.log(res);
      //         if(res.ok) {
      //           that.setState({errors: {error: `Email to reset password has been sent to ${that.state.email}`}})
      //           that.setState({email: ''})
      //         } else {
      //           that.setState({errors: {error: `There is no account associated with ${that.state.email}`}})
      //
      //         }
      //     })
      //     .catch(error => console.error('Error:', error));
    }
  }

  render() {
    return(
      <div className="container">
        <ForgotPasswordForm />
      </div>
    )
  }
}


export default (ResetPassword);
