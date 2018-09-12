import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps);
    return (
      nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked
    );
  }
  render() {
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
