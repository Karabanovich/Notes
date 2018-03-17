import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { HashRouter } from 'react-router-dom';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './style.css';
ReactDOM.render(
    <HashRouter >
        <div className="height">
            <Redirect to="/Signin" key='toSign'/>
            <App />
        </div>
    </HashRouter >,
    document.getElementById('mount-point')
);
