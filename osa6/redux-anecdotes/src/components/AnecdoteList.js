import React from 'react';
import { connect } from 'react-redux';

import { voteFor } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const vote = anecdote => {
    props.store.dispatch(voteFor(anecdote.id));
    props.store.dispatch(setMessage(`You voted for '${anecdote.content}'`));
    setTimeout(() => {
      props.store.dispatch(removeMessage());
    }, 5000);
  };

  const byVotes = (a, b) => b.votes - a.votes;

  return (
    <div>
      {props.anecdotes
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
        )
        .sort(byVotes)
        .map(anecdote => (
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteFor,
  setMessage,
  removeMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
