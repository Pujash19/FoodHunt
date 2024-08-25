import React, { useState, useEffect } from "react";  
import Shimmer from "./shimmer";
import RestaurantsCard from "./restaurantList";
import useOnline from "./useonline";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";
import RestaurantMenu from "./restaurantMenu";
const Body=()=>{
    const [searchText, setsearchText]= useState('');
    const [filterRestaurants, setFilterRestaurants]= useState([]);
    const [allRestaurant, setAllRestaurants]= useState([]);
    function filterData(filterRestaurants, searchText){
      return filterRestaurants.filter((restaurant)=>restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    const {user, setUser}= useContext(UserContext);
    useEffect(()=>{
      getFilterRestaurants(); 
    },[]);

    async function getFilterRestaurants(){
        try{
    const data= await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.1685786&lng=79.9338798&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json= await data.json();
    async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }const resData = await checkJsonData(json);
      console.log(resData);

      // update the state variable restaurants with Swiggy API data
      setFilterRestaurants(resData);
      setAllRestaurants(resData);
    } catch (error) {
        console.log(error);
      }
    };

     const online= useOnline()

    if(!online){
      return <h1>No internet connection</h1> 
    } 
    
    return allRestaurant?.length=== 0 ? 
    <Shimmer />
    :(
        <>
        <div className>
            <input type="text" 
            placeholder="search" 
            value={searchText} 
            onChange={(e)=>{
                const data=filterData(allRestaurant, e.target.value)
            setFilterRestaurants(data);
                setsearchText(e.target.value)}}></input> 
            <button>Search</button>   
        </div>
        <input placeholder="Enter Your name" value={user.name} onChange={e=>{
          setUser({...user, name: e.target.value})}}></input>
        <input placeholder="Enter Your mail" value={user.email} onChange={(e)=>{
            setUser({...user,email: e.target.value})}}
        ></input>
    <div className="RestaurantCard">
      {filterRestaurants?.length=== 0 && searchText?.length > 0?
         (<h1>Restaurant not found</h1>):
        ( filterRestaurants?.map((Restaurants) =>
             (<Link to={`/restaurant/${Restaurants?.info?.id}`} key={Restaurants?.info?.id}><RestaurantsCard  {...Restaurants?.info} /></Link>))
      )};

    </div>
    </>
    );
}
export default Body;