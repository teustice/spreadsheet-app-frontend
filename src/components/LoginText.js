import React, {Component} from 'react';

class LoginText extends Component {
    render() {
        return (
            <div className={"login-text"} >
                {this.props.currentUser &&
                    <p>Hello, {this.props.currentUser.email}</p>
                }
            </div>
        );
    }
}

export default LoginText;