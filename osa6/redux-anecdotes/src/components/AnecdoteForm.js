import React from 'react';
import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

import anecdoteService from '../services/anecdotes';

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(content);
    props.createAnecdote(newAnecdote);
    props.setMessage(`Added '${content}'`);
    setTimeout(() => {
      props.removeMessage();
    }, 5000);
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
