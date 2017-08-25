import textReducers from './reducers';
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk';

const store = createStore(
  textReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

export default store