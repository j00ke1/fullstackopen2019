import React from 'react';
import Person from './Person';

const Personlist = ({ persons, filter, filteredPersons }) => {
  const phoneBookRows = () => {
    if (filter) {
      return filteredPersons.map(person => (
        <Person key={person.name} person={person} />
      ));
    }
    return persons.map(person => <Person key={person.name} person={person} />);
  };

  return (
    <div>
      <h3>Numbers</h3>
      <div>{phoneBookRows()}</div>
    </div>
  );
};

export default Personlist;
