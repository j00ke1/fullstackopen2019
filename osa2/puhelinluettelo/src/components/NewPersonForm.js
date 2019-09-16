import React from 'react';

const NewPersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange
}) => {
  return (
    <div>
      <h3>Add new</h3>
      <form onSubmit={addPerson}>
        <div>
          Name: <input onChange={handleNameChange} value={newName} required />
          <br />
          Number:{' '}
          <input onChange={handleNumberChange} value={newNumber} required />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default NewPersonForm;
