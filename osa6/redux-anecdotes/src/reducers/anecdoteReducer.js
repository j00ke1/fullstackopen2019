const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case 'NEW_ANECDOTE':
      const newAnecdote = {
        content: action.data.content,
        id: action.data.id,
        votes: 0
      };
      return state.concat(newAnecdote);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = object => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: object.content,
      id: object.id
    }
  };
};

export const voteFor = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};

export default anecdoteReducer;
