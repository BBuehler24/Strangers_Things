import React from 'react';
import { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import "../css/register.css";

// We need to setup a form for client to register & acquire token for access.

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const {setToken} = useOutletContext()

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(username, password, confirmation)
        // I want to make sure the pass and confirmation are the same, error if not
        if(password !== confirmation) {
            setError("Password does not match!")
            return // vs else statement
        }

        // how can we send the post request to register?
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        password,
                    }
                })
            });
            const result = await response.json();
            // console.log(result);
            if(!result.success) {
                setError(result.error.message) // is a point on the data 
                return
            } else {
                setMessage(result.data.message)
            }
            console.log(result);
            // save token to state & localstorage
            // setToken(result.data.token);
            // why again do we need to lie double save it in local storage?
            // local storage is like a little semi permanent hard drive we the devs can save keys and values in our clients browser
            console.log(result.data.token);
            localStorage.setItem('token', result.data.token)
            navigate("/");
    }

    return (
        <div>
            <header>
                <h1>Welcome To Stranger's Things!</h1>
            </header>
        <div className="form-box">
            <form id="register-form" onSubmit={handleRegister}>
            <div className="field">
            <label>User Info:</label> 
            <br/>
                <input 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='username' />

                <br/>

                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='password' 
                type="password" />

                <br/>

                 <input 
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder='re-type password' 
                type="password" />

                <br/>
            </div>
                <button id="submit-button">Register</button>
            </form>
            <p>{error}</p>
            <p>{message}</p>
            <Link to={"/login"}>Already Registered? Login Here!</Link>
        </div>
        </div>
    )
}

export default Register;