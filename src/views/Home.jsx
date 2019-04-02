import React, {Component} from 'react';

import TodoList from '../components/todo/TodoList';
import CSVParser from '../components/CSVParser';

class Home extends Component {

  render() {
    return(
      <div className="container">
        <h1 className="h2 page-title">Home Page</h1>
        <CSVParser />
        <TodoList />

      </div>
    )
  }
}


export default (Home);
