import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getTodos,
  deleteTodo
} from '../actions/todoActions'

class TodoList extends Component {

    componentDidMount() {
      this.props.getTodos()
    }

    render() {
      let that = this;
      let todos = this.props.todos.data ? this.props.todos.data.map(function(todo, index){
            return (
                <div key={index} className='todo'>
                    <h3>
                      {todo.user._id === that.props.currentUser._id &&
                        <span style={{color: 'crimson'}} onClick={() => that.props.deleteTodo(todo._id)}>X</span>
                      }
                      {todo.title}
                    </h3>
                    <p>{todo.text}</p>
                    <p>posted by: <i>{todo.user.email}</i></p>
                </div>
            )
        }) : undefined;
        return (
            <div className={"todo-list-wrapper"}>
                {todos}
            </div>
        );
    }
}


const mapStateToProps = state => ({
 ...state
})


const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos()),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
