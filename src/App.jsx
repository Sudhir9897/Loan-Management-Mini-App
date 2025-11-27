import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import OTP from './components/OTP'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { initializeData } from './utils/storage'

export default function App(){
  useEffect(()=> {
    // Initialize sample data in localStorage if not present
    initializeData()
  },[])

  return (
    <div className="container">
      <div className="header">
        <h2>Loan Management Mini App</h2>
        {/* <nav>
          <Link to="/" className="link" style={{marginRight:10}}>Login</Link>
          <Link to="/signup" className="link">Signup</Link>
        </nav> */}
      </div>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}
