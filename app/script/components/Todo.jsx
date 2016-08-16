import React, { Component, PropTypes } from 'react';
import JSONPretty from 'react-json-pretty';

export default class Todo extends Component {
  render() {
    return (
      <li>
        <JSONPretty id="json-pretty" json={this.props.text}></JSONPretty>
      </li>
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
  completed: PropTypes.bool.isRequired
}