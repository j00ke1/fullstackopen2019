import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filterform from './components/Filterform';
import NewPersonForm from './components/NewPersonForm';
import Personlist from './components/Personlist';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      setPersons(res.data);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(
      persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, persons]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
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
      <Personlist
        persons={persons}
        filter={filter}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
