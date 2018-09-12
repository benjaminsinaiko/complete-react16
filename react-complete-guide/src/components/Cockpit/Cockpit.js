import React from 'react';

import Aux from '../../hoc/Aux';
import './Cockpit.css';

const cockpit = props => {
  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  const classes = [];

  if (props.showPersons) {
    style.backgroundColor = 'red';
  }

  if (props.persons.length <= 2) {
    classes.push('red');
  }
  if (props.persons.length <= 1) {
    classes.push('bold');
  }

  return (
    <Aux>
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(' ')}>This is really working</p>
      <button style={style} onClick={props.clicked}>
        Toggle Names
      </button>
    </Aux>
  );
};

export default cockpit;
