import React, {Component} from 'react';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../actions/setCurrentUser'
import apiUrl from '../../lib/apiUrl';
import roles from '../../lib/roles';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            roles: roles,
            errors: undefined
        }
    }

    updateEmail(e) {
        this.setState({email: e.target.value})
    }

    updatePassword(e) {
        this.setState({password: e.target.value})
    }

    updateRoles(e) {
      let role = e.target.value;

      let newRoles = this.state.roles;
      newRoles[role] = !newRoles[role];
      this.setState({roles: newRoles})
    }

    signUp(e) {
        e.preventDefault();
        let that = this;
        let user = {
            user: {
                email: that.state.email,
                password: that.state.password,
                roles: this.state.roles
            }
        }

        console.log(user);

        fetch(`${apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(function(res) {
                return res.json()
            })
            .then(function(json){
                if(json && json.user) {
                    that.props.setCurrentUser(json.user)
                    localStorage.setItem('currentUser', JSON.stringify(json.user));
                    that.setState({errors: ''})
                    that.props.history.push('/')
                    that.props.notifications.addNotification({
                      message: `Welcome, ${json.user.email}`,
                      level: 'success'
                    })
                } else if(json.errors) {
                    that.setState({errors: json.errors})
                }
            })
            .catch(error => console.error('Error:', error));
    }


    render() {
      let that = this;
      let errors = [];
      if(this.state.errors) {
          for(var error in this.state.errors){
              errors.push(
                  <p key={error}>{error} {this.state.errors[error]}</p>
              )
          }
      }
      let rolesCheckboxes = Object.keys(this.state.roles).map(function(role, index) {
          return (
            <div key={index}>
              <label>{role}</label>
              <input type="checkbox" value={role} checked={that.state.roles[index]} onChange={that.updateRoles.bind(that)} />
            </div>
          );
      });

      return (
        <React.Fragment>
          {!this.props.currentUser &&
            <div className={"login-form-wrapper"} >
                <h3>Sign Up</h3>

                <form onSubmit={this.signUp.bind(this)} >
                    <label>Email</label>
                    <input name="email" type='text' onKeyUp={this.updateEmail.bind(this)} />
                    <label>Password</label>
                    <input name="password" type='password' onKeyUp={this.updatePassword.bind(this)} />
                    <div className="form-group">
                      <label>Roles</label>
                      {rolesCheckboxes}
                    </div>
                    <br />
                    <button className="btn btn-sm" type='submit'>Sign Up</button>
                    <div>{errors}</div>
                </form>

            </div>
          }
        </React.Fragment>
      );
    }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 setCurrentUser: (val) => dispatch(setCurrentUser(val)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
