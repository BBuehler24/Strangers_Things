import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

const Profile = ({user, setUser}) => { // was trying to pass token here
    const[userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages]= useState([]);

    const { token } = useOutletContext(); // but did here instead

    const getUserData = async () => {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/users/me', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const info = await response.json();
        console.log(info);
        setUserPosts(info.data.posts)
        setUserMessages(info.data.messages)
        console.log(userPosts);
    }
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
        <h2>My Posts:</h2>
            {
                userPosts.map((post, idx) => {
                    const {title, price, location, description} = post;
                    return <div className="post-container" key={idx}>
                        <div className="post">
                            <div className="post-title"><strong>{title}</strong></div>
                            <div className="post-description"><strong>Description:</strong>{description}</div>
                            <div className="post-price"><strong>Price:</strong>{price}</div>
                            <div className="post-location"><strong>Location:</strong>{location}</div>
                        </div>
                    </div>
                })
            }
        <h2>Received Messages:</h2>
            {
                userMessages.map((msg, idx) => {
                    return <div key={idx}>
                    <h3>{msg.post.title}</h3>
                    <div>From: {msg.fromUser.username}</div>
                    <div>Message: {msg.content}</div>
                    </div>
                })
            }
        {/* <h2>Sent Messages:</h2>
            {
                userMessages.map((msg, idx) => {
                    return <div key={idx}>
                    <h3>{msg.post.title}</h3>
                    <div>From: {msg.fromUser.username}</div>
                    <div>Message: {msg.content}</div>
                    </div>
                })
            } */}
        </div>
    )
}

export default Profile;