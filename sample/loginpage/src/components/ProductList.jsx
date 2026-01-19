import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, removeProduct } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
  const products = useSelector(state => state.products.items);
  const dispatch = useDispatch();
  const { role } = useAuth();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (name && price) {
      dispatch(addProduct({ id: Date.now(), name, price: Number(price) }));
      setName('');
      setPrice('');
    }
  };

  const handleUpdate = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  const handleSave = () => {
    dispatch(updateProduct({ id: editId, name, price: Number(price) }));
    setEditId(null);
    setName('');
    setPrice('');
  };

  return (
    <div>
      <h2>Products</h2>
      {role === 'admin' && (
        <div style={styles.form}>
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
          <button onClick={editId ? handleSave : handleAdd} style={styles.button}>
            {editId ? 'Update' : 'Add'}
          </button>
        </div>
      )}
      <div style={styles.list}>
        {products.map(product => (
          <div key={product.id} style={styles.item}>
            <span>{product.name} - ${product.price}</span>
            <div>
              <button onClick={() => dispatch(addToCart(product))} style={styles.btnSmall}>
                Add to Cart
              </button>
              {role === 'admin' && (
                <>
                  <button onClick={() => handleUpdate(product)} style={styles.btnSmall}>
                    Edit
                  </button>
                  <button onClick={() => dispatch(removeProduct(product.id))} style={styles.btnSmall}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', flex: 1 },
  button: { padding: '8px 16px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  item: { display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd' },
  btnSmall: { padding: '4px 8px', marginLeft: '5px', cursor: 'pointer' }
};

export default ProductList;
