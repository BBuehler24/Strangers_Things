import { Link, useOutletContext } from "react-router-dom";
import "../css/posts.css";
import PostFilter from "./postSearch";

const Posts = () => {
  const { posts, displayedPosts, setDisplayedPosts } = useOutletContext(); // allows all siblings to have access to this data

  return (
    <div className="post-search">
      <PostFilter
        displayedPosts={displayedPosts}
        setDisplayedPosts={setDisplayedPosts}
        posts={posts}
      />
      <div className="posts">
        {displayedPosts.map((post) => {
          return (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div className="post-listing">{post.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;

// What do to get actual posts?
// Step1: create some state to put the posts after we fetch them
