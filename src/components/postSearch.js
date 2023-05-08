import { useState } from 'react';

const PostFilter = ({ posts, setDisplayedPosts }) => {
  const [searchValue, setSearchValue] = useState('');

  function filterPosts(e, searchValue) {
    e.preventDefault();
    const filteredPostsReturn = posts.filter(
      (post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDisplayedPosts(filteredPostsReturn);
  }

  return (
    <form onSubmit={(e) => filterPosts(e, searchValue)}>
      <input
        className="search-value"
        value={searchValue}
        placeholder="Search Posts Keyword"
        id="search-value"
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="search-button">Search</button>
    </form>
  );
};

export default PostFilter;