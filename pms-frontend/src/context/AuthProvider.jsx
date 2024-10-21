import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// AuthProvider component to wrap around your app and manage global state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if(token) {
      (async () => {
        try {
          let res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`, {
            withCredentials: true
          });
          setIsAuthenticated(true); // Set authentication state to logged in
          setRole(res.data.role); // Set user role
        } catch (err) {
          setIsAuthenticated(false); // If token is invalid, set authentication state to logged out
        } finally {
          setLoading(false);
        }
      }) ();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []);

  // Function to set authentication state to logged in
  const login = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`, {
        withCredentials: true
      });
      setIsAuthenticated(true); // Set authentication state to logged in
      setRole(res.data.role); // Set user role
    } catch (err) {
      setIsAuthenticated(false); // If token is invalid, set authentication state to logged out
    } finally {
      setLoading(false);
    }
  };

  // Function to log out the user (remove token)
  const logout = () => {
    Cookies.remove('token'); // Remove the token cookie
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, login, logout }}>
      {loading ? <p>Loading...</p> : children} {/* Prevent rendering until loading is done */}
    </AuthContext.Provider>
  );
};