import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import {
  getTodos,
  deleteTodo
} from '../../actions/todoActions'
import SimpleModal from '../SimpleModal'
import TodoListForm from './TodoListForm'



class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      rows: undefined,
      selectedTodo: undefined
    }

    this.modal = React.createRef()
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
      { key: 'modify', name: 'Modify', sortable: false },
      { key: 'title', name: 'Title', sortable: true },
      { key: 'text', name: 'Text', sortable: true } ];


    let rows = this.props.todos.data ? this.props.todos.data.map(function(todo, index){
      let modifyButtons = todo.user._id === that.props.currentUser._id ?
        <div>
          <span style={{color: 'crimson'}} onClick={() => that.deleteTodo(todo)}>X</span>
          <span style={{color: 'green'}} onClick={() => that.editTodo(todo)}> Edit</span>
        </div> : '';

          return {
            modify: modifyButtons,
            title: todo.title,
            text: todo.text}
      }) : '';
      let filteredrows = rows;
      return (
        <React.Fragment>
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
