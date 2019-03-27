import React, {Component} from 'react';

class Profile extends Component {

  render() {
    let roles = [];
    if(this.props.currentUser) {
      for (var role in this.props.currentUser.roles) {
        if (this.props.currentUser.roles.hasOwnProperty(role) && this.props.currentUser.roles[role]) {
          roles.push(' ' + role + ' ')
        }
      }
    }
    return (
      <div className="container">
        <h1 className="h2 page-title">Profile Page</h1>

        <div className="profile-info">
          <h4>
            <span>Email:</span>
            <span>{this.props.currentUser.email}</span>
          </h4>
          <h4>
            <span>Roles:</span>
            <span>{roles}</span>
          </h4>
        </div>


      </div>
    )
  }
}


export default (Profile);
