import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { updatePost } from './api';
import "../css/editpost.css";

const EditPost = ({
  post,
  setEditMode,
  token,
  user,
  setDisplayedPosts,
  setAllPosts,
}) => {
  const [itemName, setItemName] = useState(post.title);
  const [itemDescription, setItemDescription] = useState(post.description);
  const [itemPrice, setItemPrice] = useState(post.price);
  const [itemLocation, setItemLocation] = useState(post.location);
  const [willDeliverItem, setWillDeliverItem] = useState(false);

  const { fetchPosts } = useOutletContext();

  const handleEditPost = async (
    e,
    postToUpdate,
    token,
    itemName,
    itemDescription,
    itemPrice,
    itemLocation,
    willDeliverItem
  ) => {
    e.preventDefault();

    const updatedPost = await updatePost(
      postToUpdate,
      token,
      itemName,
      itemDescription,
      itemPrice,
      itemLocation,
      willDeliverItem
    );
    const newPosts = await fetchPosts(user, token);
    setDisplayedPosts(newPosts.data.posts);
    setAllPosts(newPosts.data.posts);
    console.log(updatePost);

    setEditMode(false);
  };

  return (
    <form
      className="edit-post-data"
      id="edit-post-form"
      onSubmit={(e) =>
        handleEditPost(
          e,
          post._id,
          token,
          itemName,
          itemDescription,
          itemPrice,
          itemLocation,
          willDeliverItem
        )
      }
    >
    <h3 id="edit-title">What Would You Like To Edit?</h3>
      <div className="post-edit">
      <label>Update Item Name: </label>
        <input
          className="edit-title"
          value={itemName}
          type="text"
          name="item-name"
          required
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="post-edit">
      <label>Update Item Description: </label>
        <input
        className="edit-description"
          value={itemDescription}
          type="text"
          name="item-description"
          required
          onChange={(e) => setItemDescription(e.target.value)}
        />
      </div>
      <div className="post-edit">
        <label>Price: </label>
        <input
        className="edit-price"
          value={itemPrice}
          type="text"
          name="item-price"
          required
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>
      <div className="post-edit">
        <label htmlFor="item-location">
          <span className="post-attribute">Location:</span>{' '}
        </label>
        <input
        className="edit-location"
          value={itemLocation}
          type="text"
          name="item-location"
          onChange={(e) => setItemLocation(e.target.value)}
        />
      </div>
      <p id="seller">
        Seller: 
        <select
          name="will-deliver"
          className="post-inputs"
          defaultValue={post.willDeliver ? true : false}
          onChange={(e) => setWillDeliverItem(e.target.value)}
        >
          <option value={true}>will</option>
          <option value={false}>will not</option>
        </select>
        deliver
      </p>
      <div>
        <button type="submit" id="edit-button">
          Confirm Edit
        </button>
        <button id="edit-cancel-button" onClick={() => setEditMode(false)}>
          Cancel Edit
        </button>
      </div>
    </form>
  );
};

export default EditPost;