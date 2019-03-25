import React, {Component} from 'react';

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

        fetch('http://localhost:8080/api/users/login', {
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
                console.log(json)
                if(json && json.user) {
                    console.log(json)
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
        console.log(this.state)
        let errors = [];
        if(this.state.errors) {
            for(var error in this.state.errors){
                errors.push(
                    <p key={error}>{error} {this.state.errors[error]}</p>
                )
            }
        }
        return (
            <div className={"login-form-wrapper"} style={{marginBottom: 50}}>

                {!this.props.currentUser &&
                    <form  onSubmit={this.login.bind(this)} >
                        <h3>Log In</h3>
                        <label>Email</label>
                        <input name="email" type='text' onKeyUp={this.updateEmail.bind(this)} />
                        <label>Password</label>
                        <input name="password" type='password' onKeyUp={this.updatePassword.bind(this)} />
                        <button type='submit'>Log In</button>
                        <div>{errors}</div>
                    </form>
                }
                {this.props.currentUser &&
                    <button onClick={this.props.resetCurrentUser}>Log Out</button>
                }
            </div>
        );
    }
}

export default LoginForm;