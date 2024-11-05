import React from 'react';

function LoginRegister() {
    return (
        <div>
            <h2>Log In / Register</h2>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
                <button type="button">Register</button>
            </form>
        </div>
    );
}

export default LoginRegister;