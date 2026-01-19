import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) login(name, role);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" style={styles.button}>Login</button>
    </form>
  );
};

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', flex: 1 },
  select: { padding: '8px' },
  button: { padding: '8px 16px', cursor: 'pointer' }
};

export default LoginForm;
