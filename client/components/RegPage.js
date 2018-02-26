import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';
import Main from './Main';
import './RegPage.css'
import { Switch, Route, Link, Redirect } from 'react-router-dom';
class RegPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="RegPage">
                <Header />
                <div className="Main">
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

export default RegPage;
