import React from 'react'
import LoginPage from './components/LoginPage'
import AdminRegistrationPage from './components/RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthProvider';
import UserRegister from './components/UserRegister';
import NotFoundPage from './components/NotFound404';

const App = () => {
  const VITE_ENV = import.meta.env.VITE_ENV;
  
  return (
    <div className='bg-zinc-900 text-white min-h-screen w-full'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {VITE_ENV === 'development' && <Route path="/admin/register" element={<AdminRegistrationPage />} />}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </div>
  )
}

export default App
