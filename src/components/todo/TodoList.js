import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Data } from "react-data-grid-addons";

import {
  getTodos,
  deleteTodo,
  deleteTodoBatch
} from '../../actions/todoActions'
import SimpleModal from '../SimpleModal'
import TodoListForm from './TodoListForm'
import LoadingSpinner from '../LoadingSpinner'
import TableToolbar from '../TableToolbar'

const selectors = Data.Selectors;


function handleFilterChange(filter, filters) {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};



class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      initialRows: [],
      selectedIndexes: [],
      selectedTodo: undefined,
      filters: {}
    }

    this.modal = React.createRef()
  }

  componentDidMount() {
    //map todos from props to state for sorting
    this.props.getTodos(this.mapTodosToState.bind(this));
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

  sortRows (sortColumn, sortDirection)  {
    const comparer = (a, b) => {
      let colA = a[sortColumn];
      let colB = b[sortColumn];
      //If column is a string, make lowercase to sort properly
      colA = typeof(colA) === "string" ? colA.toLowerCase() : colA;
      colB = typeof(colB) === "string" ? colB.toLowerCase() : colB;
      if (sortDirection === "ASC") {
        return colA > colB ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return colA < colB ? 1 : -1;
      }
    };
    return sortDirection === "NONE" ? this.props.todos.data.slice() : this.getRows(this.state.rows.data, this.state.filters).slice().sort(comparer);
  };

  getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
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
    let that = this;
    if (window.confirm(`Are you sure you want to delete todo: ${todo.title}`)) {
      this.props.deleteTodo(todo._id, function() {
        that.props.notifications.addNotification({
          message: todo.title + ' was deleted successfully',
          level: 'success'
        })
      })
    }
  }

  closeModal() {
    this.modal.current.closeModal()
  }

  downloadCSV(data) {
    let filename = 'export.csv';
    let csvContent = '';
    csvContent += 'title,text' + "\r\n";
    data.forEach(function(rowArray, index){
       let row = rowArray.join(",");
       data.length === index + 1 ?
          csvContent += row  :
          csvContent += row + "\r\n";
    });

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }

  bulkAction(action) {
    let that = this;
    switch (action) {
      case 'DELETE':
        if (window.confirm(`Are you sure you want to delete the selected items?`)) {
          let idArray = [];
          this.state.selectedIndexes.forEach(function(i){
            //get selected indexes of filtered dataset
            idArray.push(that.getRows(that.state.rows.data, that.state.filters)[i]._id);
          })
          that.props.deleteTodoBatch(idArray, function() {
            that.props.notifications.addNotification({
              message: 'Items were deleted successfully',
              level: 'success'
            })

            that.setState({selectedIndexes: []})
          });
        }
        break;
      case 'DOWNLOAD':
          let rowArray = [];
          this.state.selectedIndexes.forEach(function(i){
            //get selected indexes of filtered dataset
            let row = that.getRows(that.state.rows.data, that.state.filters)[i];
            rowArray.push([
              `"${row.title}"`,
              `"${row.text}"`
            ]);
          })

          this.downloadCSV(rowArray);

        break;
      default:

    }
  }

  render() {
    let that = this;
    const columns = [
      { key: 'title', name: 'Title', sortable: true, filterable: true },
      { key: 'text', name: 'Text', sortable: true, filterable: true },
      { key: 'user', name: 'User', sortable: true, filterable: true },
      { key: 'modify', name: 'Modify', sortable: false, width: 100 },
    ];

    let modifyButtons;
    let rows = this.state.rows.data ? that.getRows(this.state.rows.data, this.state.filters).map(function(todo, index){
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
            {this.state.rows.data ?
              <div className={"todo-list-wrapper"}>
                <ReactDataGrid
                  columns={columns}
                  rowGetter={i => rows[i]}
                  rowsCount={rows.length}
                  minHeight={500}
                  onGridSort={(sortColumn, sortDirection) =>
                    this.setState({rows: {data: this.sortRows(sortColumn, sortDirection,)}})
                  }
                  toolbar={
                    <TableToolbar
                      selected={this.state.selectedIndexes}
                      bulkDelete={() => this.bulkAction('DELETE')}
                      downloadCSV={() => this.bulkAction('DOWNLOAD')}
                      enableFilter={true} />}
                  onAddFilter={filter => this.setState({ filters: handleFilterChange(filter) })}
                  onClearFilters={() => this.setState({ filters: {} })}
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
                  <TodoListForm submitCallback={() => this.props.getTodos().then(this.mapTodosToState.bind(this))}/>
                </div> :
                <LoadingSpinner />
            }

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
  getTodos: (callback) => dispatch(getTodos(callback)),
  deleteTodo: (id, callback) => dispatch(deleteTodo(id, callback)),
  deleteTodoBatch: (idArray, callback) => dispatch(deleteTodoBatch(idArray, callback)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
