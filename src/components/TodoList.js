import React, {Component} from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        let that = this;
        fetch('http://localhost:8080/api/todos')
            .then(function(res) {
                return res.json()
            })
            .then(function(json){
                that.setState({todos: json})
            })
            .catch(error => console.error('Error:', error));
    }


    render() {
        const todos = this.state.todos.map(function(todo, index){
            return (
                <div key={index} className='todo'>
                    <h3>{todo.title}</h3>
                    <p>{todo.text}</p>
                </div>
            )
        })
        return (
            <div className={"todo-list-wrapper"}>
                {todos}
            </div>
        );
    }
}

export default TodoList;