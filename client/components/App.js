import React, { Component } from 'react';
import './App.css';
import RegPage from './RegPage';
import { Route, Redirect } from 'react-router'
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
      <Route exact path="/" render={() => (
 
 <Redirect to="/Signin"/>
)}/>
        <RegPage />
      </div>
    );
  }
}

export default App;
