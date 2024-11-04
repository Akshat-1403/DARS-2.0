import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Records</Link></b>
                <ul className="right">
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;