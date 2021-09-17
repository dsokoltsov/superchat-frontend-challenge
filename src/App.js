import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Main from './components/main/main.jsx';

function App() {
  return (
    // <div className="app-wrapper">
    //   <Main />
    // </div>
    <Router>
      <Switch>
        <Route path="/about">
          <div>About</div>
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
