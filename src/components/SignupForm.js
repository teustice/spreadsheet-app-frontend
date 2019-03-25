import React, {Component} from 'react';
import { connect } from 'react-redux';

import { setCurrentUser } from '../actions/setCurrentUser'
import apiUrl from '../lib/apiUrl';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: undefined
        }
    }

    updateEmail(e) {
        this.setState({email: e.target.value})
    }

    updatePassword(e) {
        this.setState({password: e.target.value})
    }

    login(e) {
        e.preventDefault();
        let that = this;
        let user = {
            user: {
                email: that.state.email,
                password: that.state.password
            }
        }

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
                } else if(json.errors) {
                    that.setState({errors: json.errors})
                }
            })
            .catch(error => console.error('Error:', error));
    }


    render() {
        let errors = [];
        if(this.state.errors) {
            for(var error in this.state.errors){
                errors.push(
                    <p key={error}>{error} {this.state.errors[error]}</p>
                )
            }
        }
        return (
          <React.Fragment>
            {!this.props.currentUser &&
              <div className={"login-form-wrapper"} style={{marginBottom: 50}}>
                  <h3>Sign Up</h3>

                  <form onSubmit={this.login.bind(this)} >
                      <label>Email</label>
                      <input name="email" type='text' onKeyUp={this.updateEmail.bind(this)} />
                      <label>Password</label>
                      <input name="password" type='password' onKeyUp={this.updatePassword.bind(this)} />
                      <button type='submit'>Sign Up</button>
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
