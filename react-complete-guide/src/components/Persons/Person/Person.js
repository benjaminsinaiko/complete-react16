import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);

    this.inputElement = React.createRef();
  }

  componentDidMount() {
    if (this.props.position === 0) {
      this.inputElement.current.focus();
    }
    console.log('props from person', this.props.authenticated);
  }

  focus() {
    this.inputElement.current.focus();
  }

  render() {
    const style = {
      '@media (minWidth: 500px)': {
        width: '450px'
      }
    };
    return (
      <div className="Person" style={style}>
        {this.props.authenticated ? <p>I'm authenticated</p> : null}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          ref={this.inputElement}
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
