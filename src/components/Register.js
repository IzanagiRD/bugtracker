import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import signupImg from '../public/register.png'
import './Register.css'
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
        <div id='registerdiv'>
            
            <form id='registerForm' onSubmit={handleRegister}>
                <h2>Register</h2>
                <input className='register' type="text" name='fname' placeholder="First Name" onChange={handleChange} required />
                <input className='register' type="text" name='lname' placeholder="Last name" onChange={handleChange} required />
                <input className='register' type='email' name='email' placeholder='Email' onChange={handleChange} required/>
                <input className='register' type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input className='register' type='password' name='confirm' placeholder='Confirm Password' onChange={handleChange} required/>
                <button className='register' type="submit">Register</button>
                <Link id='toLogin' to={'/login'}>Already have an account?</Link>
            </form>
            <div id="registerImgDiv"><img src={signupImg}/></div>
        </div>
    );
}
export default Register;