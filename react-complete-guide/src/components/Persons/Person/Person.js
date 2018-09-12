import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Person.css';

class Person extends Component {
  render() {
    const style = {
      '@media (minWidth: 500px)': {
        width: '450px'
      }
    };
    return (
      <div className="Person" style={style}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default Person;
