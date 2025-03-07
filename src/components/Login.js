import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [LoginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...LoginData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', LoginData, { headers: { 'Content-Type': 'application/json' } });

            if (response.data.success) {
                setIsLoggedIn(true);
                navigate(response.data.redirectTo);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(`Error Logging in: ${error}`);
        }
    };

    return (
        <div id="logindiv">
            <form id="loginform" onSubmit={handleLogin}>
                <h2>Sign In to Your Account</h2>
                <input className='login' type='email' name='email' placeholder='Email' onChange={handleChange} required />
                <input className='login' type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button className='login' type="submit">Login</button>
                <Link id="link" to={'/register'}>Don't have an Account?</Link>
            </form>
            <div id="loginImgDiv">
                <img src="/sign-up.png" alt="Sign Up" />
            </div>
        </div>
    );
};

export default Login;