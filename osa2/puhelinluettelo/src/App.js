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

  const clearFields = () => {
    setNewName('');
    setNewNumber('');
  };

  const addPerson = e => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };
    const allNames = persons.map(person => person.name);

    if (allNames.includes(newName)) {
      const existingPerson = persons.find(p => p.name === newName);

      const updatedPerson = { ...newPerson, number: newNumber };
      if (
        window.confirm(
          `${newName} already exists. Replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, updatedPerson)
          .then(res => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : res.data
              )
            );
            clearFields();
          })
          .catch(err => console.log(err));
        return;
      } else {
        clearFields();
        return;
      }
    }

    personService
      .create(newPerson)
      .then(res => {
        if (res.status === 201) {
          personService.getAll().then(res => {
            setPersons(res.data);
          });
          clearFields();
        }
      })
      .catch(err => console.log(err));

    // setPersons(persons.concat(newPerson));
  };

  const removePerson = e => {
    const id = e.target.value;
    if (window.confirm('Do you really want to delete this person?')) {
      personService
        .remove(id)
        .then(res => {
          if (res.status === 200) {
            personService.getAll().then(res => {
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
