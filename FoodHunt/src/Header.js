import React, { useState } from "react";
import foodhuntImage from './foodhunt.jpg';
import './App.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";
import { useSelector } from "react-redux";
import store from "./store";

const Header=()=>{
const {user}= useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn]= useState(true);

 const cartItems= useSelector((store)=>store.cart.items);
 console.log(cartItems)
return(
    <div className="header">
    <img src={foodhuntImage} alt="logo"></img>
    <h1 style={{textAlign:'center'}}>Food Hunt</h1>
    <h4>{user.name}: {user.email} </h4> 
    <ul className="navItems">
        <Link to="/"><li>Home</li></Link>
        <Link to="/about">  <li>About</li></Link>
        <Link to="/contact"> <li>Contact</li></Link>
       <Link to="/cart"><li>cart-{cartItems.length}</li></Link>
    </ul>
    {isLoggedIn? 
    <button onClick={()=>setIsLoggedIn(false)}>Login</button>
        : <button onClick={()=>setIsLoggedIn(true)}>Logout </button>}
    </div>
);
}
export default Header;
