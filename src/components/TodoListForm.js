import React, {Component} from 'react';
import { connect } from 'react-redux';

import {createTodo} from '../actions/todoActions'

class TodoListForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            errors: undefined,
        }
    }

    addTodo(e) {
      e.preventDefault();
      let body = {
        title: this.state.title,
        text: this.state.text,
        user: this.props.currentUser
      };

      this.props.createTodo(body)

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
                  <h3>Add a todo</h3>
                  <label>Title</label>
                  <input name="title" type='text' onKeyUp={this.updateTitle.bind(this)} />
                  <label>Text</label>
                  <textarea name="text" type='text' onKeyUp={this.updateText.bind(this)} />
                  <button type='submit'>Add</button>
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
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoListForm);
