import { Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";

const Root = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    

    // putting fetchPosts/posts in root so we can pass down as prop in <Outlet /> for use in rest of app
     const fetchPosts = async () => { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/posts'); //add correct URL
        const info = await response.json();
        setPosts(info.data.posts);
        console.log(posts);
    }

    useEffect(() => {
        // if theres a token in local storage, go ahead and request user info from server.
        async function fetchUser() {
        const localToken = localStorage.getItem('token')
        if(localToken) {
            setToken(localToken)
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/users/me', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localToken}`
                },
              });
              const result = await response.json();
              console.log(result);
              // if success is true save the user info
              if(result.success) {
                setUser(result.data);
              }
        }
    }
    fetchUser();
    }, [token])

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
    <div>
    <Navbar user={user} setUser={setUser} setToken={setToken}/>
    <Outlet context={{ user, posts, setToken, token, setUser }}/>
    </div>
    )
}

export default Root;

// to be logged in:
    // They have a token
    // token stored in localStorage
    // user info is stored in state (username, id)

