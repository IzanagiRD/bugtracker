// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Log In / Register</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/workshop">Workshop</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}

export default Navbar;