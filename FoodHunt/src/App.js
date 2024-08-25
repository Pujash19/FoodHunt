import './App.css';
import React, { useContext, useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './body.js';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import About from './about.js';
import Error from './error.js';
import Contact from './Contact.js';
import RestaurantMenu from './restaurantMenu.js';
import UserContext from './userContext.js';
import { Provider } from 'react-redux';
import store from './store.js';
import Cart from './cart.js';
function App() {
  const [user, setUser]= useState({
    name: "Puja",
    email:"puja@gmail.com"
  })
    return (
    <Provider store={store}>
    <UserContext.Provider value={{
      user:user,
      setUser: setUser
      }}>
    <Header />
    <Outlet />
    <Footer />
    </UserContext.Provider>
    </Provider>
    );
}

const router= createBrowserRouter([
  {
path:"/",
element:<App />,
errorElement:<Error />,
children:[
  {
    path:"/",
    element:<Body />
    },
  {
  path:"/about",
  element:<About />
  },
  {
    path:"/contact",
    element:<Contact />
    },
    {
      path:"/restaurant/:id",
      element:<RestaurantMenu />
      },
      {
        path:"/cart",
        element:<Cart />
        },
    
]
  }
]);

export default router;