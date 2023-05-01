import React from "react";

export async function updatePost(
  postToUpdate,
  token,
  itemName,
  itemDescription,
  itemPrice,
  itemLocation,
  willDeliverItem
) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/posts/${postToUpdate}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: itemName,
            description: itemDescription,
            price: itemPrice,
            location: itemLocation,
            willDeliver: willDeliverItem,
          },
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function messageSend(postId, token, messageContent) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: `${messageContent}`,
          },
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
