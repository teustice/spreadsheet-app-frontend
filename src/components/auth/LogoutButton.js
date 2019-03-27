import React, {Component} from 'react';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../actions/setCurrentUser'

class LogoutButton extends Component {

    resetCurrentUser() {
      localStorage.removeItem('currentUser')
      this.props.setCurrentUser(null);
      this.props.history.push('/signin')
    }


    render() {
        return (
          <React.Fragment>
            {this.props.currentUser &&
              <div className="logout-button">
                <button className="btn btn-sm" onClick={this.resetCurrentUser.bind(this)}>Log Out</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
