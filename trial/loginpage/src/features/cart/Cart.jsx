import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./cartSlice";

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Cart</h3>

      {cart.length === 0 && <p>Cart is empty</p>}

      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ₹{item.price}
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
