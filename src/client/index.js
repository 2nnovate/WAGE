import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { App, Region, Login, Register, MyPage, AddStore,
          AdminPage, EditStore } from './containers'
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
        <Route path='/' component={App}/>
        <Route exact path='/' component={Region}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Switch>
          <Route path='/mypage/:user_id' component={MyPage}/>
          <Route path='/mypage' component={MyPage}/>
        </Switch>
        <Route exact path='/admin' component={AdminPage}/>
        <Route path='/admin/add-store' component={AddStore}/>
        <Route path='/admin/edit/:store_id' component={EditStore}/>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));
