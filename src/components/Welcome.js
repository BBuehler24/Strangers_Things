import React from 'react';
import { Link, NavLink } from "react-router-dom";
import "../css/welcome.css";

// I want a new functional component that renders a div with the words "welcome to strangers things"

const Welcome = () => {
    return (
        <div>
            <div>
                <h1>Welcome To Stranger's Things!</h1>
                <h3 id="easy-sell">Where It's Easy To Buy & Sell Your Stuff!</h3>
            </div>
            <div className="welcome-links">
                <div>
                <Link className="welcome-posts" to={"/posts"}>Check Out Our For Sale Postings Here:</Link>
                </div>
                <div>
                <Link id="register-here" to={"/register"}>Don't Have An Account? Sign-Up Here:</Link>
                </div>
                <div>
                <Link id="login-here" to={"/login"}>Already Have An Account? Sign In Here:</Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome;