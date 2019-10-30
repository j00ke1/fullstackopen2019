import React from 'react';
import { connect } from 'react-redux';

import { voteFor } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteFor(anecdote);
    props.setMessage(`You voted for '${anecdote.content}'`, 3);
  };

  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <div>
      {props.visibleAnecdotes.sort(byVotes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === '') {
    return anecdotes;
  }
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  };
};

const mapDispatchToProps = {
  voteFor,
  setMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
