import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
            const response = await axios.post('http://localhost:8000/login', LoginData, { headers: { 'Content-Type': 'application/json' } });

            if (response.data.success) {
                setIsLoggedIn(true); // Update login state on success
                navigate(response.data.redirectTo);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(`Error Logging in: ${error}`);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
                <Link to={'/register'}>Don't have an Account?</Link>
            </form>
        </div>
    );
};

export default Login;