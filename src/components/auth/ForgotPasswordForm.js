import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getUsers
} from '../../actions/userActions'
import apiUrl from '../../lib/apiUrl';

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            showForm: false,
            errors: undefined,
        }
    }

    forgotPassword(e) {
      e.preventDefault();
      let body;
      let that = this;

      if(this.state.email){
        body = {
          email: this.state.email
        }
        fetch(`${apiUrl}/users/forgot`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(function(res) {
                if(res.ok) {
                  that.setState({errors: {error: `Email to reset password has been sent to ${this.state.email}`}})
                  that.setState({email: ''})
                } else {
                  that.setState({errors: res})
                }
            })
            .catch(error => console.error('Error:', error));

        if(this.props.submitCallback) {
          this.props.submitCallback();
        }
      }
    }

    updateEmail(e) {
        this.setState({email: e.target.value})
    }


    render() {
      let errors = [];
      if(this.state.errors) {
          for(var error in this.state.errors){
            console.log(this.state.errors[error]);
              errors.push(
                  <p key={this.state.errors[error]}>{this.state.errors[error]}</p>
              )
          }
      }
        return (
            <div className="forgot-password-form">

              <form onSubmit={this.forgotPassword.bind(this)} >
                <div className="form-group">
                  <div className="input-wrapper">
                    <label>Email</label>
                    <input name="email" type='text' value={this.state.email} onChange={this.updateEmail.bind(this)} required />
                  </div>
                  <button type='submit' className="btn btn-sm">Reset Password</button>
                </div>
                <div>{errors}</div>
              </form>
            </div>
        );
    }
}


const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  getUsers: (token) => dispatch(getUsers(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
