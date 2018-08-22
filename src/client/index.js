import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Region, Login, Register } from './containers'
import './style.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={Region}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));
