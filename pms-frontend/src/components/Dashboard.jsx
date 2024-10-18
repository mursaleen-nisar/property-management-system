import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { isAuthenticated, role, loading } = useContext(AuthContext);
  const navigate = useNavigate();

    // Log the values to see how they change
    useEffect(() => {
        console.log('Dashboard state:');
        console.log('isAuthenticated:', isAuthenticated);
        console.log('role:', role);
        console.log('loading:', loading);
      }, [isAuthenticated, role, loading]);

    // Redirect to login page if the user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/');
        }
    }, [isAuthenticated, navigate]);

      // Show loading while waiting for role to be fetched
  if (loading || role === null) {
    console.log('Loading is true or role is null, showing loading message...');
    return <p>Loading...</p>;
  }

    return (
        role === 'admin' ? <AdminDashboard /> : <UserDashboard />
    )
};

export default Dashboard;