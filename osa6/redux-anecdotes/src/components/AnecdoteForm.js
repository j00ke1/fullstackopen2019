import React from 'react';
import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content);
    props.setMessage(`Added '${content}'`);
    setTimeout(() => {
      props.removeMessage();
    }, 5000);
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setMessage,
  removeMessage
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
