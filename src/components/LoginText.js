import React, {Component} from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginText);
