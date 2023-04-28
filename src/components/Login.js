import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                        username,
                        password,
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
            console.log(result);
            localStorage.setItem('token', result.data.token)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <header>
                <h1>Welcome to Strangers' Things!</h1>
                <h2>Login Below:</h2>
            </header>

            <div className="login-main">
                <form
                id="login"
                onSubmit={loginUser}
                >
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
                    <br/>
                    <br/>
                    <button>Login</button>
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