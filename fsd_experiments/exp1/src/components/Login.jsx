import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && password) {
      login(userName, password);
    }
  };

  return (
    <div className="flex-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your account</p>
          <p style={{ fontSize: '0.8rem', marginTop: '10px', color: 'var(--accent-color)' }}>
            Hint: Use username "admin" to log in as Admin.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              className="input-field" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '24px' }}>
            <LogIn size={18} /> Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
