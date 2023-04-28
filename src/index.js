import React from 'react';
import ReactDOM from 'react-dom';
import Root from './routes/root';
import Welcome from './components/Welcome';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import CreatePosts from './components/CreatePost';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// how to use react-router dom
  // step1: we have to install it, doesnt come included with react
  // step2: got to react-router-dom docs and copy the boilerplate

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/", 
        element: <Welcome />},
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/createpost",
        element: <CreatePosts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      }
    ]
  },
])

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'))
