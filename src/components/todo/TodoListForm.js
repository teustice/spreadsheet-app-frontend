import React, {Component} from 'react';
import { connect } from 'react-redux';

import {createTodo, updateTodo} from '../../actions/todoActions'

class TodoListForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.todo ? this.props.todo.title : '',
            text: this.props.todo ? this.props.todo.text : '',
            errors: undefined,
        }
    }

    addTodo(e) {
      e.preventDefault();
      let body;
      let that = this;

      if(this.props.editMode && this.props.todo){
        body = {
          title: this.state.title,
          text: this.state.text,
        }
        this.props.updateTodo(body, this.props.todo._id, function() {
          that.props.notifications.addNotification({
            message: body.title + ' was updated successfully',
            level: 'success'
          })
        })

        if(this.props.submitCallback) {
          this.props.submitCallback();
        }
      } else {
        body = {
          title: this.state.title,
          text: this.state.text,
          user: this.props.currentUser
        };
        this.props.createTodo(body, function() {
          that.props.notifications.addNotification({
            message: body.title + ' was created successfully',
            level: 'success'
          })
        })

        if(this.props.submitCallback) {
          this.props.submitCallback();
        }
      }


      this.setState({title: '', text: ''})

    }

    updateTitle(e) {
        this.setState({title: e.target.value})
    }

    updateText(e) {
        this.setState({text: e.target.value})
    }


    render() {
        return (
            <div className={this.props.editMode ? "todo-list-edit-form" : "todo-list-form"}>
              <form  onSubmit={this.addTodo.bind(this)} >
                  <h3>{this.props.editMode ? 'Edit' : 'Add'} todo</h3>
                  <div className="form-group">
                    {this.props.todo &&
                      <p>Editing Todo id: {this.props.todo._id}</p>
                    }
                    <div className="input-wrapper">
                      <label>Title</label>
                      <input name="title" type='text' value={this.state.title} onChange={this.updateTitle.bind(this)} />
                    </div>
                    <div className="input-wrapper">
                      <label>Text</label>
                      <textarea name="text" type='text' value={this.state.text} onChange={this.updateText.bind(this)} />
                    </div>
                    <button type='submit' className="btn">{this.props.editMode ? 'Update' : 'Add'}</button>
                  </div>
                  <p>{this.state.errors}</p>
              </form>
            </div>
        );
    }
}


const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  createTodo: (body, callback) => dispatch(createTodo(body, callback)),
  updateTodo: (body, id, callback) => dispatch(updateTodo(body, id, callback))
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoListForm);
