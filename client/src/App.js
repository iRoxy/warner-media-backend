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
  // constructor(props) {
  //   super(props);
  // }


  componentDidMount() {
  // if (window.location.hash.indexOf('access_token') !== -1) {
  //   this.auth.handleAuthentication(err => {
  //     if (err) {
  //       this.history.push('/');
  //       alert(`Error: ${err.error}. Check the console for further details.`);
  //       console.error(err);
  //       return;
  //     }
  //     this.props.history.push('/series');
  //   });
  // }
}

  render() {
    return(
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>

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
