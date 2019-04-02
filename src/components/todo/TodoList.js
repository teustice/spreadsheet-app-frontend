import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import {
  getTodos,
  deleteTodo
} from '../../actions/todoActions'
import SimpleModal from '../SimpleModal'
import TodoListForm from './TodoListForm'

// function iterationCopy(src) {
//   let target = {};
//   for (let prop in src) {
//     if (src.hasOwnProperty(prop)) {
//       target[prop] = src[prop];
//     }
//   }
//   return target;
// }

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      initialRows: [],
      selectedIndexes: [],
      selectedTodo: undefined
    }

    this.modal = React.createRef()
  }

  componentDidMount() {
    //map todos from props to state for sorting
    this.props.getTodos().then(this.mapTodosToState.bind(this));
  }

  componentDidUpdate() {
    if(JSON.stringify(this.props.todos.data) !== JSON.stringify(this.state.initialRows.data)) {
      this.mapTodosToState()
    }
  }

  mapTodosToState() {
    this.setState({rows: {data: this.props.todos.data.slice()}})
    this.setState({initialRows: {data: this.props.todos.data.slice()}})
  }

  sortRows (initialRows, sortColumn, sortDirection, rows)  {
    const comparer = (a, b) => {
      //If column is a string, make lowercase to sort properly
      a[sortColumn] = typeof(a[sortColumn]) === "string" ? a[sortColumn].toLowerCase() : a[sortColumn];
      b[sortColumn] = typeof(b[sortColumn]) === "string" ? b[sortColumn].toLowerCase() : b[sortColumn];
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === "NONE" ? this.props.todos.data.slice() : rows.sort(comparer);
  };

  rowGetter = i => {
    return this.state.rows[i];
  };

  onRowsSelected = rows => {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    });
  };

  onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });
  };

  editTodo(todo) {
    this.setState({selectedTodo: todo});
    this.modal.current.openModal()
  }

  deleteTodo(todo) {
    if (window.confirm(`Are you sure you want to delete todo: ${todo.title}`)) {
      this.props.deleteTodo(todo._id)
    }
  }

  closeModal() {
    this.modal.current.closeModal()
  }

  render() {
    let that = this;
    const columns = [
      { key: 'title', name: 'Title', sortable: true },
      { key: 'text', name: 'Text', sortable: true },
      { key: 'user', name: 'User', sortable: true },
      { key: 'modify', name: 'Modify', sortable: false, width: 100 },
    ];

    let modifyButtons;
    let rows = this.state.rows.data ? this.state.rows.data.map(function(todo, index){
      if(todo.user._id === that.props.currentUser._id || that.props.currentUser.roles.admin) {
        modifyButtons = (
          <div>
            <span style={{color: 'crimson'}} onClick={() => that.deleteTodo(todo)}>X</span>
            <span style={{color: 'green'}} onClick={() => that.editTodo(todo)}> Edit</span>
          </div>
        );
      } else {
        modifyButtons = ''
      }
      return {
        modify: modifyButtons,
        title: todo.title,
        text: todo.text,
        user: todo.user.email}
      }) : '';
      return (
        <React.Fragment>
          <div className={"todo-list-wrapper"}>
            {this.state.rows &&
              <ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={rows.length}
                minHeight={500}
                onGridSort={(sortColumn, sortDirection) =>
                  this.setState({rows: {data: this.sortRows(this.props.todos.data, sortColumn, sortDirection, this.state.rows.data)}})
                }
                rowSelection={{
                  showCheckbox: true,
                  enableShiftSelect: true,
                  onRowsSelected: this.onRowsSelected,
                  onRowsDeselected: this.onRowsDeselected,
                  selectBy: {
                    indexes: this.state.selectedIndexes
                  }
                }}
                />
            }
          </div>
          <TodoListForm submitCallback={() => this.props.getTodos().then(this.mapTodosToState.bind(this))}/>

          <SimpleModal ref={this.modal} isOpen={false}>
            <TodoListForm editMode={true} todo={this.state.selectedTodo} submitCallback={this.closeModal.bind(this)}/>
          </SimpleModal>
        </React.Fragment>
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
