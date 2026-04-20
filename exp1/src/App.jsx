import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./components/login";
import Products from "./components/Products";
import Cart from "./components/cart";

const App = () => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: "",
    role: "",
    token: ""
  });

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    setAuth({
      isLoggedIn: false,
      user: "",
      role: "",
      token: ""
    });
  };

  return (
    <Provider store={store}>
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      {!auth.isLoggedIn ? (
        <Login setAuth={setAuth} />
      ) : (
        <>
          <h2>
            Welcome {auth.user} ({auth.role})
          </h2>

          <button onClick={handleLogout}>Logout</button>

          <Products role={auth.role} />
          <Cart />
        </>
      )}
    </Provider>
  );
};

export default App;
