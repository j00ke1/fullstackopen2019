import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
