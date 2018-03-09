import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './style.css';
ReactDOM.render(
    <BrowserRouter >
        <div className="height">
            <Route exact path="/" render={() => (<Redirect to="/Signin" />)} />
            <App />
        </div>
    </BrowserRouter >,
    document.getElementById('mount-point')
);
