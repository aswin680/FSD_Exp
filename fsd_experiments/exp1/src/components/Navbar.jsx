import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { ShoppingCart, LogOut, User } from 'lucide-react';

const Navbar = ({ onCartClick }) => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector(state => state.cart.items);
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          TechStore
        </h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <User size={18} />
            <span>Hello, <strong style={{ color: 'var(--text-primary)' }}>{user.userName}</strong> ({user.role})</span>
          </div>
        )}
        
        <button className="btn" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-color)' }} onClick={onCartClick}>
          <ShoppingCart size={18} />
          {cartItemCount > 0 && (
            <span style={{ background: 'var(--accent-color)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', position: 'absolute', top: '-8px', right: '-8px' }}>
              {cartItemCount}
            </span>
          )}
          <span style={{ position: 'relative' }}>Cart</span>
        </button>
        
        <button className="btn btn-danger" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
