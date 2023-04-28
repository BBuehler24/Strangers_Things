import React, { useState } from 'react';

const CreatePosts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);

    const handleSubmit = async (e) => {
        const localToken = localStorage.getItem('token')
        e.preventDefault();

        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-PT/posts', {
                method: "POSTS",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localToken}`
                },
                body: JSON.stringify({
                    post: {
                        title,
                        description,
                        price,
                        location,
                        willDeliver
                    }
                })
            })
            const result = await response.json();
            console.log(result);
            setTitle('');
            setDescription('');
            setPrice('');
            setLocation('');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input 
                value={title}
                type="text"
                placeholder="Input Post Title"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <br/>
            <input 
                value={description}
                type="text"
                placeholder="Input Post Description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <br/>
            <input 
                value={price}
                type="text"
                placeholder="Input Item Price"
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
            />
            <br/>
            <input 
                value={location}
                type="text"
                placeholder="Input Item Location"
                onChange={(e) => {
                    setLocation(e.target.value);
                }}
            />
            <br/>
            <label>Willing to deliver?</label>
            <input 
                value={willDeliver}
                type="checkbox"
                onChange={(e) => {
                    setWillDeliver(!willDeliver);
                }}
            />

            <br/>
            <button>Submit New Post</button>
        </form>
        </div>
        
    )

}

export default CreatePosts;