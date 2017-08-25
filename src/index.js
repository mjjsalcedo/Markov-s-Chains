import './styles.css';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App.js';
import { Provider } from 'react-redux';
import { userConnect } from './actions'
import textReducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import store from './store'
import UserLogin from './containers/usernamePage/index.js';
import SelectPlayer from './containers/selectPlayer/index.js';

store.dispatch(userConnect());

render(
  <Provider store={store}>
  <Router>
        <div>
          <Route exact path="/" component={UserLogin}/>
          <Route path="/select" component={SelectPlayer}/>
        </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

          /*<Route exact path="/" component={App}/>*/
