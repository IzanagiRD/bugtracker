import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/logout');
            if (response.data.success) {
                setIsLoggedIn(false);  // Reset the login state in the parent
                navigate('/login');
            }
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    BugTracker
                </Link>
                <div className={`menu-icon ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    {isOpen ? '✖' : '☰'}
                </div>
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-links" onClick={toggleMenu}>
                                Dashboard
                            </Link>
                        </li>
                    ) : null}
                    <li className="nav-item">
                        <Link to="/workshop" className="nav-links" onClick={toggleMenu}>
                            Workshop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={toggleMenu}>
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contactus" className="nav-links" onClick={toggleMenu}>
                            Contact
                        </Link>
                    </li>
                    {/* Move login/logout button inside the menu */}
                    <li className="nav-item">
                        {isLoggedIn ? (
                            <button className="nav-links logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="nav-links login-button" onClick={toggleMenu}>
                                Log In
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
