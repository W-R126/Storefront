import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import StoreFrontPage from './Pages/StoreFront';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={StoreFrontPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
