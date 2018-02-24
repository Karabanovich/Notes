import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';
import './RegPage.css'
class RegPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="RegPage">
                <Header />
                <div className="Main">
                    <RegForm />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default RegPage;
