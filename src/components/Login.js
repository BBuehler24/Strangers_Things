import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate= useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    }
                })
            });
            const result = await response.json();
            if(!result.success) {
                setError(result.error.message) // is a point on the data 
                return
            } else {
                setMessage(result.data.message)
            }
            localStorage.setItem('token', result.data.token)
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        navigate('/profile');
    }

    return (
        <div>
            <header>
                <h1>Welcome Back to Stranger's Things!</h1>
            </header>

            <div className="login-main">
            <label>Login Below:</label>
                <form
                id="login"
                onSubmit={loginUser}
                >
                <div className='login-field'>
                    <input
                    value={username}
                    type="text"
                    placeholder='enter username'
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                <br/>
                    <input 
                    value={password}
                    type="password"
                    placeholder='enter password'
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    </div>
                    <br/>
                    <br/>
                    <button id="login-button">Login</button>
                    <br/>
                    {/* <Link to={"/register"}>No Username/Password? Register Here!</Link> */}
                </form>
                <p>{error}</p>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Login;