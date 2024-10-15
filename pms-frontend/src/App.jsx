import React from 'react'
import LoginPage from './components/LoginPage'
import AdminRegistrationPage from './components/RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='bg-zinc-900 text-white min-h-screen w-full'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/register" element={<AdminRegistrationPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
