import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import {
  getTodos,
  deleteTodo
} from '../actions/todoActions'



class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      rows: undefined
    }
  }

  componentDidMount() {
    this.props.getTodos();

  }

  sortRows (initialRows, sortColumn, sortDirection, rows)  {
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
  };


  render() {
    let that = this;
    const columns = [
      { key: 'delete', name: 'Delete', sortable: true },
      { key: 'title', name: 'Title', sortable: true },
      { key: 'text', name: 'Text', sortable: true } ];


    let rows = this.props.todos.data ? this.props.todos.data.map(function(todo, index){
      let deleteButton = todo.user._id === that.props.currentUser._id ?
          <span style={{color: 'crimson'}} onClick={() => that.props.deleteTodo(todo._id)}>X</span> :
            '';

          return {
            delete: deleteButton,
            title: todo.title,
            text: todo.text}
      }) : '';
      let filteredrows = rows;
      return (
          <div className={"todo-list-wrapper"}>
            {rows &&
              <ReactDataGrid
                columns={columns}
                rowGetter={i => filteredrows[i]}
                rowsCount={rows.length}
                minHeight={400}
                onGridSort={(sortColumn, sortDirection) =>
                  filteredrows = this.sortRows(rows, sortColumn, sortDirection, filteredrows)
                }
                />
            }
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
