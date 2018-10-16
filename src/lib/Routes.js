import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../views/Home';
import PageNotFound from '../views/PageNotFound';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
          <CSSTransition key={this.props.location.key} classNames="fade" timeout={1000}>
            <Switch location={this.props.location}>
              <Route exact path='/' component={Home}/>
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
