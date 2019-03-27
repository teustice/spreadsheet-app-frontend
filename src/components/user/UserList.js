import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import {
  getUsers
} from '../../actions/userActions'
import SimpleModal from '../SimpleModal'



class UserList extends Component {
  constructor() {
    super();

    this.state = {
      rows: undefined,
      selectedTodo: undefined
    }

    this.modal = React.createRef()
  }

  componentDidMount() {
    if(this.props.currentUser) {
      this.props.getUsers(this.props.currentUser.token);
    }
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
      { key: 'email', name: 'Email', sortable: true },
      { key: 'roles', name: 'Roles', sortable: true },
      { key: 'id', name: 'ID', sortable: false } ];

    let modifyButtons;
    let rows = this.props.users.data ? this.props.users.data.map(function(user, index){
      if(that.props.currentUser.roles.admin) {
        modifyButtons = (
          <div>
            <span style={{color: 'crimson'}} onClick={() => that.deleteTodo(user)}>X</span>
            <span style={{color: 'green'}} onClick={() => that.editTodo(user)}> Edit</span>
          </div>
        );
      } else {
        modifyButtons = ''
      }
      return {
        modify: modifyButtons,
        email: user.email,
        roles: Object.keys(user.roles).map(function(role){
          return ' ' + role + ' ';
        }),
        id: user._id}
      }) : '';
      let filteredrows = rows;
      return (
        <React.Fragment>
          <div className={"user-list-wrapper"}>
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
        </React.Fragment>
      );
  }
}


const mapStateToProps = state => ({
 ...state
})


const mapDispatchToProps = dispatch => ({
  getUsers: (token) => dispatch(getUsers(token)),
})


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
