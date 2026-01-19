import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import { useAuth } from "../../context/AuthContext";

const Products = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div>
      <h3>Products</h3>

      {user.role === "admin" && (
        <button
          onClick={() =>
            dispatch(
              addProduct({
                id: Date.now(),
                name: "Laptop",
                price: 50000,
              })
            )
          }
        >
          Add Product
        </button>
      )}

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ₹{p.price}

            {user.role === "admin" && (
              <button onClick={() => dispatch(removeProduct(p.id))}>
                Delete
              </button>
            )}

            {user.role === "user" && (
              <button onClick={() => dispatch(addToCart(p))}>
                Add to Cart
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
