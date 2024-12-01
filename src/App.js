// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import Workshop from './components/Workshop';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import './App.css'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contactus" element={<ContactUs />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;