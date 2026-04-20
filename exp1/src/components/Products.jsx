import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, updateProduct } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";

const Products = ({ role }) => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleAddProduct = () => {
    if (!productName.trim() || !productPrice) {
      alert("Enter product name and price");
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice)
      })
    );

    setProductName("");
    setProductPrice("");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductName(product.name);
    setProductPrice(product.price);
  };

  const handleUpdate = () => {
    if (!productName.trim() || !productPrice) {
      alert("Enter product name and price");
      return;
    }

    dispatch(
      updateProduct({
        id: editingId,
        name: productName,
        price: parseFloat(productPrice)
      })
    );

    setEditingId(null);
    setProductName("");
    setProductPrice("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setProductName("");
    setProductPrice("");
  };

  return (
    <div>
      <h3>Products</h3>

      {role === "admin" && (
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />

          <label htmlFor="productPrice">Price:</label>
          <input
            id="productPrice"
            type="number"
            placeholder="Enter price"
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
          />

          {editingId ? (
            <>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAddProduct}>Add Product</button>
          )}
        </div>
      )}

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ₹{p.price}

            <button onClick={() => dispatch(addToCart(p))}>
              Add to Cart
            </button>

            {role === "admin" && (
              <>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => dispatch(removeProduct(p.id))}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
