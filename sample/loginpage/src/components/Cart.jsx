import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <span>{item.name} x {item.quantity} = ${item.price * item.quantity}</span>
              <button onClick={() => dispatch(removeFromCart(item.id))} style={styles.button}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </>
      )}
    </div>
  );
};

const styles = {
  item: { display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', marginBottom: '10px' },
  button: { padding: '4px 8px', cursor: 'pointer' }
};

export default Cart;
