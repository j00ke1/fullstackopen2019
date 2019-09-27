import React, { useState, useEffect } from 'react';

import Filterform from './components/Filterform';
import NewPersonForm from './components/NewPersonForm';
import Personlist from './components/Personlist';
import Notification from './components/Notification';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState({});

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  useEffect(() => {
    personService
      .getAll()
      .then(res => {
        setPersons(res.data);
      })
      .catch(err => console.log(err));
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
            setMessage(`Updated the number of ${newName} to ${newNumber}`);
            setMessageStyle(successStyle);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(err => {
            console.log(err);
            setMessage(`${newName} has already been deleted from server`);
            setMessageStyle(errorStyle);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter(person => person.name !== newName));
            clearFields();
          });
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
          setPersons(persons.concat(res.data));
          clearFields();
          setMessage(`Added ${newName} to the phonebook`);
          setMessageStyle(successStyle);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
      })
      .catch(err => {
        console.log(err);
        setMessage(err.response.data.error);
        setMessageStyle(errorStyle);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        clearFields();
      });
  };

  const removePerson = e => {
    const id = e.target.value;
    if (window.confirm('Do you really want to delete this person?')) {
      personService
        .remove(id)
        .then(res => {
          if (res.status === 204) {
            personService.getAll().then(res => {
              setPersons(res.data);
            });
          }
          setMessage('Person deleted from the phonebook');
          setMessageStyle(successStyle);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(err => {
          console.log(err);
          setMessage('This person has already been deleted');
          setMessageStyle(errorStyle);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          personService.getAll().then(res => {
            setPersons(res.data);
          });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageStyle={messageStyle} />
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
