import React, { Component } from 'react';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  state = {
    isLoggedIn: false,
    userId: null
  }

  checkLogin = () => {
    if (localStorage.getItem("userId") != null || this.state.isLoggedIn) {
      return <Redirect to="/" />
    }
    return <Redirect to="/login" />
  }

  setUser = id => {
    localStorage.setItem("userId", id);
    this.setState({ userId: id, isLoggedIn: true });
  }

  logoutUser = () => {
    localStorage.removeItem("userId");
    this.setState({ userId: null, isLoggedIn: false });
  }

  render() {
    return (
      <div className="app-container">
        <Router>
          {this.checkLogin()}
          <Switch>
            <Route exact path="/" component={() => <Dashboard logoutUser={this.logoutUser} />}></Route>
            <Route path="/login" component={() => <Login setUser={this.setUser} />}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
