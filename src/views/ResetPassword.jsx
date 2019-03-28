import React, {Component} from 'react';
import { connect } from 'react-redux';
import apiUrl from '../lib/apiUrl';
import { setCurrentUser } from '../actions/setCurrentUser'

import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import PasswordUpdateForm from '../components/user/PasswordUpdateForm';

class ResetPassword extends Component {

  componentDidMount() {
    let that = this;
    if(this.props.match.params.token) {
      let token = this.props.match.params.token;

      fetch(`${apiUrl}/users/reset-password/${token}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
          if(!json.errors && json.user) {
            that.props.setCurrentUser(json.user)
            localStorage.setItem('currentUser', JSON.stringify(json.user));
          }
      })
      .catch(error => console.error('Error:', error));
    }
  }

  render() {
    return(
      <div className="container">
        {!this.props.currentUser &&
          <div>
            <p>Something went wrong! Try resending the email below.</p>
            <ForgotPasswordForm />
          </div>
        }
        {this.props.currentUser &&
          <PasswordUpdateForm email={this.props.currentUser.email}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
