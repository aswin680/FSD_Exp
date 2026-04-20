import React, { useState } from "react";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setAuth({
      isLoggedIn: true,
      user: email,
      role: role,
      token: "fake-jwt-token"
    });
  };

  return (
    <div>
      <h3>Login</h3>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <br /><br />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <br /><br />

      <label htmlFor="role">Role:</label>
      <select id="role" value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
