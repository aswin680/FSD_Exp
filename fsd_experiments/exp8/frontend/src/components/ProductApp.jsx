import React, { useState, useEffect } from 'react';
import api from '../api';
import { ShieldAlert, CheckCircle, Package } from 'lucide-react';

const ProductApp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Failed to fetch products from Spring Boot API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await api.post('/products', {
        name,
        price: Number(price)
      });
      
      setSuccessMsg(response.data.message);
      setName('');
      setPrice('');
      fetchProducts(); // Refresh list
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('An unexpected error occurred during submission.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>React & Spring Boot Integration</h1>
      
      {errorMsg && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} /> {errorMsg}
        </div>
      )}
      
      {successMsg && (
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={20} /> {successMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        
        {/* Form Component */}
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h3>Add Product</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>Product Name</label>
              <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                type="text" 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>Price</label>
              <input 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                type="number" 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Create Product
            </button>
          </form>
        </div>

        {/* Table Component */}
        <div>
          <h3>Product Catalog</h3>
          {loading ? (
            <p>Loading API data...</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p.id || idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>{p.id || '-'}</td>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Package size={16} color="#64748b" /> {p.name}
                    </td>
                    <td style={{ padding: '12px' }}>${p.price}</td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                      No products found. Add one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductApp;
