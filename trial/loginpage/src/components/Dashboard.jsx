import Products from "../features/products/Products";
import Cart from "../features/cart/Cart";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>

      {user.role === "admin" && (
        <p>Admin can add & delete products</p>
      )}

      {user.role === "user" && (
        <p>User can view products & add to cart</p>
      )}

      <Products />
      <Cart />
    </div>
  );
};

export default Dashboard;
