import React, { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import AdminRegistrationPage from './components/RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Dashboard from './components/Dashboard';

const App = () => {
  
  return (
    <div className='bg-zinc-900 text-white min-h-screen w-full'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/register" element={<AdminRegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
