import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { isAuthenticated, role, loading } = useContext(AuthContext);
  const navigate = useNavigate();

    // Redirect to login page if the user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/');
        }
    }, [isAuthenticated, navigate]);

      // Show loading while waiting for role to be fetched
  if (loading || role === null) {
    return <p>Loading...</p>;
  }

    return (
        role === 'admin' ? <AdminDashboard /> : <UserDashboard />
    )
};

export default Dashboard;