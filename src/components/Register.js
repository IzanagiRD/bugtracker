import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Register() {
    const [RegisterData, setRegisterData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirm: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setRegisterData({...RegisterData, [name]: value})
        
        
    }
    const handleRegister = async (e) => {
        // e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/register', RegisterData, { headers: { 'Content-Type': 'application/json' } })
            console.log('Response: ', response.data);
            
        } catch (error) {
            console.log(`Error Registering Account: ${error}`);
            
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name='fname' placeholder="First Name" onChange={handleChange} required />
                <input type="text" name='lname' placeholder="Last name" onChange={handleChange} required />
                <input type='email' name='email' placeholder='Email' onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type='password' name='confirm' placeholder='Confirm Password' onChange={handleChange} required/>
                <button type="submit">Register</button>
                <Link to={'/login'}>Already have an account?</Link>
            </form>
        </div>
    );
}
export default Register;