import React from 'react';
import Person from './Person';

const Personlist = ({ persons, filter, filteredPersons, removePerson }) => {
  const phoneBookRows = () => {
    if (filter) {
      return filteredPersons.map(person => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ));
    }
    return persons.map(person => (
      <Person key={person.id} person={person} removePerson={removePerson} />
    ));
  };

  return (
    <div>
      <h3>Numbers</h3>
      <div>{phoneBookRows()}</div>
    </div>
  );
};

export default Personlist;
