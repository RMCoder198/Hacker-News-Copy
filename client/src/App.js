import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from  './components/Dashboard';
import HistoryPage from './components/HistoryPage';
import ErrorPage from './components/error';
import {BrowserRouter as Router,  Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/history" component={HistoryPage}/>

        <Route exact path="/error" component={ErrorPage}/>
        
                   
        
      </div>
      </Router>
    );
  }
}

export default App;
