import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');

  const login = (name, userRole) => {
    setIsLoggedIn(true);
    setUserName(name);
    setRole(userRole);
    setToken(`token_${Date.now()}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setRole('');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
