import React from 'react';
import { Link } from 'react-router-dom';

const GenericNavbar = () => {
    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Records </Link></b>
                <ul className="right">
                    <li><Link to="/Student">Home</Link></li>
                    <li><Link to="/">Log out</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default GenericNavbar;