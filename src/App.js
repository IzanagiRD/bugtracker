import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Workshop from './components/Workshop';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import './App.css'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const res = await axios.get('/check-session', { withCredentials: true });
            if (res.data.loggedIn) {
                setIsLoggedIn(true)
            }
        } catch (err) {
            console.error('Error checking session:', err);
            setIsLoggedIn(false);
        }
    };

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={handleLogin} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/workshop"
                    element={<Workshop isLoggedIn={isLoggedIn} />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/contactus" element={<ContactUs />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;