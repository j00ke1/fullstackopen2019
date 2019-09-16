import React, { useState } from 'react';
import Person from './components/Person';
import Filterform from './components/Filterform';
import NewPersonForm from './components/NewPersonForm';
import Personlist from './components/Personlist';

let filteredPersons = [];

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleFilterChange = e => {
    setFilter(e.target.value);
    console.log('filter:', filter);
    console.log(filteredPersons);

    filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );

    console.log('filter:', filter);
    console.log(filteredPersons);
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const addPerson = e => {
    e.preventDefault();

    const allNames = persons.map(person => person.name);

    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const phoneBookRows = () => {
    if (filter) {
      return filteredPersons.map(person => (
        <Person key={person.name} person={person} />
      ));
    } else {
      return persons.map(person => (
        <Person key={person.name} person={person} />
      ));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filterform handleFilterChange={handleFilterChange} filter={filter} />
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Personlist phoneBookRows={phoneBookRows} />
    </div>
  );
};

export default App;
