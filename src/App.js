import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import Main from './components/main/main.jsx';
import ProfileCard from './components/profileCard/profileCard.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/r/:path">
          <ProfileCard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
