import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/setCurrentUser'

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if(localStorage.getItem('currentUser')) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.props.setCurrentUser(user)
      } else {
        this.props.history.push('/signin')
      }
    }

    render() {
      return (
        <div>
          { this.props.currentUser ? <ComposedComponent {...this.props} /> : 'not authorized' }
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


  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
