// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <h1 className='logo'>Bug Tracker</h1>
            <Link to="/">Home</Link>
            <Link to="/login">Log In / Register</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/workshop">Workshop</Link>
            <Link to="/about">About</Link>
            <Link to="/contactus">Contact Us</Link>
        </nav>
    );
}

export default Navbar;