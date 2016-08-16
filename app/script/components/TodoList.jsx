import React, { Component, PropTypes } from 'react'
import Todo from './Todo'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters, getNavigator } from '../actions/actions'

export default class TodoList extends Component {

  componentDidMount(){
    
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.todos.map((todo, index) =>
            <Todo {...todo}
              key={index}
              onClick={() => this.props.onTodoClick(index, null, 2)} />
          )}
        </ul>
      </div>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}