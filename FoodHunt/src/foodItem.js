import React from "react";


const FoodItem=(props)=>{
const {name, price, imageId, category, defaultPrice} = props;
return(
    <div className="cartcard">
    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+imageId}/>
    <h2>{name}</h2>
    <h3>price-{Math.round(defaultPrice ? defaultPrice/100 :price/100)} rupees</h3>
    <h4>{category}</h4>
    </div>
);
}

export default FoodItem;