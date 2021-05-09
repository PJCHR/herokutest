import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './view/Home';
import Search from './view/Search';
import Login from './view/Login';
import Register from './view/Register';
import InfoSearch from './view/InfoSearch';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} exact={true} />
        <Route path="/item/search" component={Search} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
        <Route path="/infoSearch" component={InfoSearch} />
      </Router>
    );
  }
}
export default App;
