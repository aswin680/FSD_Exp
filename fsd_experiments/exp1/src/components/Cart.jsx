import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { X, Minus } from 'lucide-react';

const Cart = ({ onClose }) => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', background: 'var(--panel-bg)', backdropFilter: 'blur(16px)', borderLeft: '1px solid var(--panel-border)', padding: '24px', zIndex: 100, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
        <h2>Your Cart</h2>
        <button className="btn" style={{ background: 'transparent', padding: '8px' }} onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(item => (
              <div key={item.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.name}</h4>
                  <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>${item.price.toFixed(2)}</span>
                  <span style={{ marginLeft: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity}</span>
                </div>
                <button 
                  className="btn btn-danger" 
                  style={{ padding: '8px' }}
                  onClick={() => dispatch(removeFromCart(item))}
                  title="Decrease Quantity or Remove"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '20px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Total:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn" style={{ flex: 2 }}>Checkout</button>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => dispatch(clearCart())}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
