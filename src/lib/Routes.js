import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'

import { TransitionGroup, CSSTransition } from "react-transition-group";
import requireAuth from '../components/HOC/requiresAuth';
import requireAdmin from '../components/HOC/requiresAdmin';

import Home from '../views/Home';
import AdminDashboard from '../views/AdminDashboard';
import Signin from '../views/Signin'
import PageNotFound from '../views/PageNotFound';

// import GridLines from '../components/GridLines';

class Routes extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeout: 1000
    }
  }
  componentDidUpdate(prevProps) {
    window.scrollTo(0,0);
  }

  componentWillUpdate(nextProps, nextState){

  }

  renderGroup(){
      return (
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="fade" timeout={1}>
            <Switch location={this.props.location}>
              <Route exact path='/' component={requireAuth(Home)}/>
              <Route exact path='/admin' component={requireAdmin(AdminDashboard)}/>
              <Route exact path='/signin' component={Signin}/>
              <Route component={PageNotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )
  }

  render(){
    return (
      <React.Fragment>
        {this.renderGroup()}
      </React.Fragment>
    )
  }
}

export default Routes;
