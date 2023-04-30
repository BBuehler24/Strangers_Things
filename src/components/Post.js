import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "../css/post.css";
import { useEffect, useState } from 'react';
import EditPost from "./EditPost";
import { messageSend } from "./api";

const Post = () => {
    const [editMode, setEditMode] = useState(false);
    const [messageDetails, setMessageDetails] = useState('');

    const { postId } = useParams();
    const { posts, token, user, setUser, setPosts, fetchPosts } = useOutletContext();

    const navigate = useNavigate();
    
    // now we want to find the post with that id in the array of posts - use .filter below!!

    const post = posts.find( (p) => p._id === postId);
    if (!post) { // required to show other return
        return <></>
    }

    console.log(post);

    const handleSubmit = async (e, postId, token, messageDetails) => {
        e.preventDefault();
        const response = await messageSend(postId, token, messageDetails);
        const newPosts = await fetchPosts(user, token);
        setPosts(newPosts.data.posts);
    }

    const handleDeletePost = async (postId, token) => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log(result);
            console.log(token);
            setUser(user);
            setPosts(posts.result.posts);
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className="individual-posts">
        <h1 id="title">{post.title}</h1>
        <h3 id="description">Description: {post.description}</h3>
        <h4 id="price">Price: {post.price}</h4>
        <h4 id="location">Location: {post.location}</h4>
        <h4 id="willDeliver">Will Deliver: {post.willDeliver}</h4>
        <h4 id="seller">Seller: {post.author.username}</h4>

        {user._id && (
            <div id="author-options">
            <button className="author-options-delete" onClick={handleDeletePost}>
                Delete Post
            </button>
            </div>
        )}
        {user._id && (
            <div id="author-options">
            <button className="author-options-edit" onClick={() => setEditMode(true)}>
                Edit Post
            </button>
            </div>
        )}
        {user._id && (
            <EditPost 
                post={post}
                setEditMode={setEditMode}
                user={user}
                token={token}
            />
        )}
        <h3>Send Message To Seller:</h3>
        {user._id && (
            <form onSubmit={(e) => {handleSubmit(e, postId, token, messageDetails)}}>
                <input 
                    className="message-box"
                    value={messageDetails}
                    type="text"
                    placeholder="Compose Message Here"
                    onChange={(e) => {
                        setMessageDetails(e.target.value);
                    }}
                />
                <button className="message-button" type="submit">
                    Send
                </button>
            </form>
        )

        }
        
    </div>
    )
}

// how do I get access to the post I need from here?
// how do we grab all of the posts from the Outlet context?

export default Post;