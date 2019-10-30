import anecdoteService from '../services/anecdotes';

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

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote.content,
        id: newAnecdote.id
      }
    });
  };
};

export const voteFor = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote);
    dispatch({
      type: 'VOTE',
      data: { id: updatedAnecdote.id }
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export default anecdoteReducer;
