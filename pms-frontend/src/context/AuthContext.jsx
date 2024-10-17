import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create a context to manage the authentication state
export const AuthContext = createContext();

// AuthProvider component to wrap around your app and manage global state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if token exists in cookies on initial load
  useEffect(() => {
    const token = Cookies.get('token'); // Check for token in cookies
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Function to set authentication state to logged in
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to log out the user (remove token)
  const logout = () => {
    Cookies.remove('token'); // Remove the token cookie
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {!loading ? children : <p>Loading...</p>} {/* Prevent rendering until loading is done */}
    </AuthContext.Provider>
  );
};