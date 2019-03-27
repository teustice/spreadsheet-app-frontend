import React, {Component} from 'react';
import { connect } from 'react-redux';

class LoginText extends Component {
    render() {
        let roles = [];
        if(this.props.currentUser) {
          for (var role in this.props.currentUser.roles) {
            if (this.props.currentUser.roles.hasOwnProperty(role) && this.props.currentUser.roles[role]) {
              roles.push('|' + role + '| ')
            }
          }
        }
        return (
            <div className={"login-text"} >
                {this.props.currentUser &&
                  <div>
                    <p>Hello, {this.props.currentUser.email}</p>
                  </div>
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
