import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="container">
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <ProductList />
          {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </>
      )}
    </div>
  );
}

export default App;
