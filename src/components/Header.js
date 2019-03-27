import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

import LoginText from './auth/LoginText';
import LogoutButton from './auth/LogoutButton';

class Header extends React.Component {
  render () {
    return (
      <div className="container header-wrapper">
        <ul>
          <li>
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
          </li>
          {this.props.currentUser && this.props.currentUser.roles.admin &&
            <li>
              <NavLink exact activeClassName="active" to="/admin">Admin Dashboard</NavLink>
            </li>
          }
        </ul>

        <div className="account-nav">
          <LoginText />
          <LogoutButton history={this.props.history}/>

        </div>


      </div>
    )
  }
}

const mapStateToProps = state => ({
 ...state
})

export default connect(mapStateToProps)(Header);
