import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, role);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <input
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
