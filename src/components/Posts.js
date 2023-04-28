import React, { useEffect } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';

const Posts = () => {
    const {posts} = useOutletContext(); // allows all siblings to have access to this data

    return (
        <div>
            <Outlet context={{ posts }} />
            {
                posts.map(post => {
                    return (
                    <Link key={post._id} to={`/posts/${post._id}`}>
                    <div>{post.title}</div>
                    </Link>
                )})
            }
        </div>
    )
}

export default Posts;

// What do to get actual posts?
// Step1: create some state to put the posts after we fetch them