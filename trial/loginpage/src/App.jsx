import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Auth + Redux Toolkit App</h1>

      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Profile />
          <Dashboard />
        </>
      )}
    </div>
  );
}

export default App;
