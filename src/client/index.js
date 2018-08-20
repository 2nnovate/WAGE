import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Region } from './containers'
import './style.css';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={Region}/>
    </div>
  </Router>
  , document.getElementById('root'));
