import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    const user = {
      email,
      role,
      loginTime: new Date().toLocaleString(),
    };

    onLogin(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
      type="text"
      placeholder="Role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
