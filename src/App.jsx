import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import OTP from './components/OTP'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { initializeData } from './utils/storage'

export default function App() {
  useEffect(() => {
    initializeData()
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h2>Loan Management Mini App</h2>
      </div>

      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/otp" element={
          <PublicRoute>
            <OTP />
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}
