// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import Workshop from './components/Workshop';
import About from './components/About';
import Navbar from './components/Navbar';

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
            </Routes>
        </Router>
    );
}

export default App;