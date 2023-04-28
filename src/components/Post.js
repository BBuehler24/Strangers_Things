import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const Post = () => {
    const { postId } = useParams();
    const { posts, token, fetchPosts } = useOutletContext();
    
    // now we want to find the post with that id in the array of posts - use .filter below!!

    const post = posts.find( (p) => p._id === postId);
    if (!post) { // required to show other return
        return <></>
    }
    // const navigate = useNavigate();
    console.log(post);

    return (
    <div>
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <h4>{post.price}</h4>
    </div>
    )
}

// how do I get access to the post I need from here?
// how do we grab all of the posts from the Outlet context?

export default Post;