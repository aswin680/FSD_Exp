import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { addProduct, removeProduct } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import { Plus, Trash2, ShoppingBag } from 'lucide-react';

const ProductList = () => {
  const products = useSelector(state => state.products.items);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const isAdmin = user && user.role === 'admin';

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProductName && newProductPrice) {
      dispatch(addProduct({
        id: Date.now(),
        name: newProductName,
        price: parseFloat(newProductPrice),
        category: 'Newly Added'
      }));
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  return (
    <div className="animate-slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Product Catalog</h2>
      </div>

      {isAdmin && (
        <div className="glass-panel" style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--accent-color)' }}>Admin Panel: Add Product</h3>
          <form style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }} onSubmit={handleAddProduct}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Product Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Product name"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Price ($)</label>
              <input 
                type="number" 
                step="0.01"
                className="input-field" 
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <button type="submit" className="btn" style={{ height: '46px' }}>
              <Plus size={18} /> Add
            </button>
          </form>
        </div>
      )}

      <div className="grid-cols-2">
        {products.map(product => (
          <div key={product.id} className="glass-panel product-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{product.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                  {product.category}
                </span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success-color)' }}>${product.price.toFixed(2)}</span>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--panel-border)', display: 'flex', gap: '12px' }}>
              <button 
                className="btn" 
                style={{ flex: 1 }}
                onClick={() => dispatch(addToCart(product))}
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
              
              {isAdmin && (
                <button 
                  className="btn btn-danger" 
                  onClick={() => dispatch(removeProduct(product.id))}
                  title="Remove Product"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
