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

      if(this.props.editMode && this.props.todo){
        body = {
          title: this.state.title,
          text: this.state.text,
        }
        this.props.updateTodo(body, this.props.todo._id)

        if(this.props.submitCallback) {
          this.props.submitCallback();
        }
      } else {
        body = {
          title: this.state.title,
          text: this.state.text,
          user: this.props.currentUser
        };
        this.props.createTodo(body)

        if(this.props.submitCallback) {
          this.props.submitCallback();
        }
      }

    }

    updateTitle(e) {
        this.setState({title: e.target.value})
    }

    updateText(e) {
        this.setState({text: e.target.value})
    }


    render() {
        return (
            <div className={"todo-list-form"}>
              <form  onSubmit={this.addTodo.bind(this)} >
                  <h3>{this.props.editMode ? 'Edit' : 'Add'} todo</h3>
                  {this.props.todo &&
                    <p>Editing Todo id: {this.props.todo._id}</p>
                  }
                  <label>Title</label>
                  <input name="title" type='text' value={this.state.title} onChange={this.updateTitle.bind(this)} />
                  <label>Text</label>
                  <textarea name="text" type='text' value={this.state.text} onChange={this.updateText.bind(this)} />
                  <button type='submit'>{this.props.editMode ? 'Update' : 'Add'}</button>
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
  createTodo: (body) => dispatch(createTodo(body)),
  updateTodo: (body, id) => dispatch(updateTodo(body, id))
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoListForm);
