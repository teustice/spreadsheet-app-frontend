import React from 'react'
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import {setNotification} from '../actions/setNotification'

class Notification extends React.Component {
  constructor() {
    super()
    this.notificationSystem = React.createRef();
  }

  addNotification(data) {
    const notification = this.notificationSystem.current;
    notification.addNotification(data);
  };

  // {
  //   message: 'Notification message',
  //   level: 'success'
  // }

  componentDidMount() {
    this.props.setNotification(this.notificationSystem.current)
  }

  render() {
    return (
      <div>
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({
  setNotification: (notificationSystem) => dispatch(setNotification(notificationSystem))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
