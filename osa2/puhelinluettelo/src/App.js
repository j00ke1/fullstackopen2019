import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleChange = e => {
    setNewName(e.target.value);
  };

  const addPerson = e => {
    e.preventDefault();
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };

  const phoneBookRows = () =>
    persons.map(person => <Person key={person.name} person={person} />);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{phoneBookRows()}</div>
    </div>
  );
};

export default App;
