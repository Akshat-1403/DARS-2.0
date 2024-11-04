import React from 'react';
import { Link } from 'react-router-dom';
import EducationList from './EducationList.jsx';

const EducationHome = () => {
    const headerStyles = {
        marginTop: "40px", 
        marginLeft: "235px", 
        marginBottom: "10px"
    };

    const tableHeaders = [
        { label: "Student ID", col: "s3" },
        { label: "Record Name", col: "s3" },
        { label: "Description", col: "s3" },
        { label: "Created Timestamp", col: "s3" }
    ];

    return (
        <div>
            <nav className="nav-wrapper grey darken-4 navbar">
                <div className="container">
                    <b><Link to="/" className="brand-logo">Records</Link></b>
                    <ul className="right">
                        <li><Link to="/Institute">Home</Link></li>
                        <li><Link to="/">Log out</Link></li>
                    </ul>
                </div>
            </nav>

            <h4 
                className="title-styled" 
                style={headerStyles}
            >
                List of Record Requests
            </h4>

            <div className="container homeList center">
                <div className="card blue darken-3 headers">
                    <div className="row">
                        {tableHeaders.map(header => (
                            <div key={header.label} className={`col ${header.col} white-text`}>
                                <h6>{header.label}</h6>
                            </div>
                        ))}
                    </div>
                </div>
                <EducationList />
            </div>
        </div>
    );
};

export default EducationHome;