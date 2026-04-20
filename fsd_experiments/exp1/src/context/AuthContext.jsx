import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { userName: string, role: 'admin' | 'user', token: string }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userName, password) => {
    // Basic mock authentication
    let role = 'user';
    if (userName.toLowerCase() === 'admin') {
      role = 'admin';
    }
    
    const newUser = { userName, role, token: 'mock-jwt-token-123' };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
