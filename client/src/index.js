import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './views/Home/Home';
import CardView from './views/CardView/CardView';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';


const router = createBrowserRouter([
  {
  path: '/',
  element: <Home/>
},{
  path: '/CardView',
  element: <CardView/>
},
{
  path: '/login',
  element: <Login/>
},
{
  path: '/signup',
  element: <Signup/>
}

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);


