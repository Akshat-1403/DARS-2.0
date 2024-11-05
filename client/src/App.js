import React from "react";

import { Route, Navigate } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";

import Home from './components/Home.jsx'
import StudentHome from './components/StudentHome.jsx'
import NewRecord from './components/NewRecord.jsx'
import ViewRecord from './components/ViewRecord.jsx';
import Educational from './components/EducationalDetails/Educational'
import EducationHome from './components/EducationHome.jsx'
import RecordDetails from './components/RecordDetails.jsx'

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to /home when the user visits the root path */}
        <Route path="/" element={<Navigate replace to="/home" />} />

        {/* Define routes using the `element` prop */}
        <Route path="Student" element={<StudentHome />} />
        <Route path="newRecord" element={<NewRecord />} />
        <Route path="viewrecord/:recordId" element={<ViewRecord />} />
        <Route path="home" element={<Home />} />
        <Route path="Institute" element={<EducationHome />} />
        <Route path="recordData/Education/:recordId" element={<Educational />} />
        <Route path="educationUpdate/:recordId" element={<RecordDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
