import React from 'react';
import { Link } from 'react-router-dom';

const ViewEducation = () => {
    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Records</Link></b>
                <ul className="right">
                    <li><Link to="/Institute">Home</Link></li>
                    <li><Link to="/Logout">Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default ViewEducation;