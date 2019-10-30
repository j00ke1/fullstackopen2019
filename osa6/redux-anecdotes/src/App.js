import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

import anecdoteService from './services/anecdotes';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initializeAnecdotes(anecdotes));
  }, [initializeAnecdotes]);
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <br />
      <Filter />
      <AnecdoteList />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes }
)(App);
