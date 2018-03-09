import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';
import Main from './Main';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/Main" component={Main} />
            <Route path="/" component={RegForm} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
