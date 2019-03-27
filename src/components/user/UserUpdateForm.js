import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getUsers
} from '../../actions/userActions'
import apiUrl from '../../lib/apiUrl';

class UserUpdateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.user.email,
            roles: this.props.user.roles,
            errors: undefined,
        }
    }

    updateUser(e) {
      e.preventDefault();
      let body;
      let that = this;

      if(this.props.user){
        body = {
          email: this.state.email,
          roles: this.state.roles,
        }
        fetch(`${apiUrl}/users/${this.props.user._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.currentUser.token}`
            },
            body: JSON.stringify(body)
        })
            .then(function(res) {
                if(res.ok) {
                  that.props.getUsers(that.props.currentUser.token)
                } else {
                  throw Error(res.statusText);
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


    updateRoles(e) {
      let role = e.target.value;

      let newRoles = this.state.roles;
      newRoles[role] = !newRoles[role];
      this.setState({roles: newRoles})
    }


    render() {
      let that = this;
      let rolesCheckboxes = Object.keys(this.state.roles).map(function(role, index) {
          return (
            <div key={index}>
              <label>{role}</label>
              <input type="checkbox" value={role} checked={that.state.roles[role]} onChange={that.updateRoles.bind(that)} />
            </div>
          );
      });
        return (
            <div className="update-user-form">
              <form onSubmit={this.updateUser.bind(this)} >
                  <h3>Update User</h3>
                  <div className="form-group">
                    {this.props.user &&
                      <p>Editing: {this.props.user.email}</p>
                    }
                    <div className="input-wrapper">
                      <label>New Email</label>
                      <input name="title" type='text' value={this.state.email} onChange={this.updateEmail.bind(this)} />
                    </div>
                    <div className="input-wrapper">
                        <div className="form-group">
                          <label>New Roles</label>
                          {rolesCheckboxes}
                        </div>
                    </div>
                    <button type='submit' className="btn">Update</button>
                  </div>
                  <p>{this.state.errors}</p>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserUpdateForm);
