import { useSelector} from "react-redux";
import FoodItem from "./foodItem";

const Cart=()=>{
    const cartItem = useSelector((store)=>store.cart.items);
    console.log('cartItem',cartItem)
;
    return(
        <div>
        <h1>cart items= {cartItem.length}</h1>
        <div className="cart">
        {cartItem.map((item)=>(<FoodItem key={item.id} {...item} />))}
        </div>
        </div>
    )
}

export default Cart;