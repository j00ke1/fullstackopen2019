import React from 'react';
import Person from './Person';

const Personlist = ({ persons, filter, filteredPersons, removePerson }) => {
  /* const removePerson = e => {
    const id = e.target.value;
    personService
      .remove(e.target.value)
      .then(res => {
        console.log('poisto', res);
      })
      .catch(err => console.log(err));
    console.log(id);
    setPersons(persons.filter(person => person.id !== id));
    console.log('persons after delete:', persons);
  }; */

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
