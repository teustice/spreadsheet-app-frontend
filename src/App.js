import React, { Component } from 'react';
import './styles/main.scss';
import { withRouter } from 'react-router-dom';
import Routes from './lib/Routes';
import Header from './components/Header';
import Notification from './components/Notifications';

class App extends Component {
  render() {
    return (
      <div className="global-wrapper">
        <Notification />
        <Header history={this.props.history}/>
        <Routes location={this.props.location}/>
      </div>
    );
  }
}

export default withRouter(App);
