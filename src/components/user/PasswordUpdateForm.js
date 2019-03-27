import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getUsers
} from '../../actions/userActions'
import apiUrl from '../../lib/apiUrl';

class PasswordUpdateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordVerify: '',
            showForm: false,
            errors: undefined,
        }
    }

    updateUser(e) {
      e.preventDefault();
      let body;
      let that = this;
      if (this.state.password !== this.state.passwordVerify) {
        this.setState({errors: {error: 'Passwords do not match'}})
      } else {
        this.setState({errors: undefined})
      }

      if(this.props.email){
        body = {
          password: this.state.password,
          email: this.props.email
        }
        fetch(`${apiUrl}/users/update-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.currentUser.token}`
            },
            body: JSON.stringify(body)
        })
            .then(function(res) {
                if(res.ok) {
                  that.setState({errors: {error: 'Password updated successfully!'}})
                  that.setState({password: '', passwordVerify: ''})
                } else {
                  that.setState({errors: {error: res.statusText}})
                }
            })
            .catch(error => console.error('Error:', error));

        if(this.props.submitCallback) {
          this.props.submitCallback();
        }
      }
    }

    updatePassword(e) {
        this.setState({password: e.target.value})
    }


    updatePasswordVerify(e) {
      this.setState({passwordVerify: e.target.value})
    }


    render() {
      console.log(this.state);
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
            <div className="update-password-form">
              <button onClick={() => this.setState({showForm: !this.state.showForm})} className="btn btn-sm">Change Password</button>
            {this.state.showForm &&
              <form onSubmit={this.updateUser.bind(this)} >
                <div className="form-group">

                  <div className="input-wrapper">
                    <label>New Password</label>
                    <input name="Password One" type='password' value={this.state.password} onChange={this.updatePassword.bind(this)} required />
                  </div>
                  <div className="input-wrapper">
                    <label>Re-enter Password</label>
                    <input name="password Verify" type='password' value={this.state.passwordVerify} onChange={this.updatePasswordVerify.bind(this)} required />
                  </div>
                  <button type='submit' className="btn btn-sm">Update</button>
                </div>
                <div>{errors}</div>
              </form>
            }
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


export default connect(mapStateToProps, mapDispatchToProps)(PasswordUpdateForm);
