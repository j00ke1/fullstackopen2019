import React, { useState, useEffect } from 'react';

import Filterform from './components/Filterform';
import NewPersonForm from './components/NewPersonForm';
import Personlist from './components/Personlist';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService.getAll().then(res => {
      console.log('get', res);
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

    personService
      .create(newPerson)
      .then(res => {
        console.log('created:', res);
        if (res.status === 201) {
          personService.getAll().then(res => {
            console.log('get', res);
            setPersons(res.data);
          });
        }
      })
      .catch(err => console.log(err));

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const removePerson = e => {
    const id = e.target.value;
    console.log(id);
    if (window.confirm('Do you really want to delete this person?')) {
      personService
        .remove(id)
        .then(res => {
          console.log('poisto', res);
          if (res.status === 200) {
            personService.getAll().then(res => {
              console.log('get', res);
              setPersons(res.data);
            });
          }
        })
        .catch(err => console.log(err));
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
      <Personlist
        persons={persons}
        filter={filter}
        filteredPersons={filteredPersons}
        setPersons={setPersons}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
