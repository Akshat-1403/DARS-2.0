import React from 'react';
import { Link } from 'react-router-dom';

const ViewDocNav = ({ recordId }) => {
    // Construct URLs for each link
    const baseUrl = `/recordData/${recordId}`;
    const educationUrl = `/recordData/Education/${recordId}`;

    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Records</Link></b>
                <ul className="right">
                    <li><Link to={baseUrl}>Record Details</Link></li>
                    <li><Link to={educationUrl}>Education Reports</Link></li>
                    <li><Link to={`${baseUrl}/other-reports`}>Other Reports</Link></li>
                    <li><Link to={`${baseUrl}/photographs`}>Record Photographs</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default ViewDocNav;