import React, {Component} from 'react';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../actions/setCurrentUser'
import apiUrl from '../../lib/apiUrl';
import LogoutButton from './LogoutButton'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: undefined,
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

        fetch(`${apiUrl}/users/login`, {
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

                    that.props.notifications.addNotification({
                      message: `Welcome, ${json.user.email}`,
                      level: 'success'
                    })

                    that.props.history.push('/')
                } else if(json.errors) {
                    that.setState({errors: json.errors})
                }
            })
            .catch(error => console.error('Error:', error));
    }

    resetCurrentUser() {
      localStorage.removeItem('currentUser')
      this.props.setCurrentUser(null);
      this.props.history.push('/signin')
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
            <div className={"login-form-wrapper"} >

                {!this.props.currentUser &&
                    <form  onSubmit={this.login.bind(this)} >
                        <h3>Log In</h3>
                        <label>Email</label>
                        <input name="email" type='text' onKeyUp={this.updateEmail.bind(this)} />
                        <label>Password</label>
                        <input name="password" type='password' onKeyUp={this.updatePassword.bind(this)} />
                        <br />
                        <button type='submit' className="btn btn-sm">Log In</button>
                        <div>{errors}</div>
                    </form>
                }
                {this.props.currentUser &&
                    <LogoutButton history={this.props.history}/>
                }
            </div>
        );
    }
}


const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (val) => dispatch(setCurrentUser(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
