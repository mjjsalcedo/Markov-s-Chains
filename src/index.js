import './css/scss/styles.css';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App.js';

import { OP_PING } from './actions.js'
import { Provider } from 'react-redux';

import textReducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const store = createStore(
  textReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

const ws = new WebSocket('ws://localhost:3001');
ws.addEventListener('open', (e) => {
  ws.send(JSON.stringify({OP:'connected'}));
})
ws.addEventListener('message', (e) => {
  console.log('ws from server', e.data);
  store.dispatch({
    type: OP_PING,
    TIME: JSON.parse(e.data).TIME
  })
})

render(
  <Provider store={store}>
  <Router>
        <div>
          <App />
        </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
