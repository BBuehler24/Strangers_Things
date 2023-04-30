import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/navbar.css";


const Navbar = ({user, setToken, setUser}) => {
  function handleLogout() {
    localStorage.removeItem("token")
    setToken('')
    setUser({})
  }

  return (
    <nav>
    <h2>Stranger's Things</h2>
      <Link to={"/"}>Home</Link>
      <Link to={"/posts"}>Posts</Link>
      <Link to={"/profile"}>Profile</Link>
      {user._id && (
      <>
        {/* <span>Welcome {user.username} !</span> */}
        <Link onClick={handleLogout} to={"/"}>Logout</Link>
        <Link to={"/createpost"}>Create New Post</Link>
        </>
        )}
      {!user._id && (
        <>
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
      </>
      )}
      <span id="user-name">Welcome {user.username} !</span>
    </nav>
  );
};

export default Navbar;
