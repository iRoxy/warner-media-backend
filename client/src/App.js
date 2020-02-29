import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Home from "./home/Home";

class App extends Component {

  render() {
    return(
      <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
