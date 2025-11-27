import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  // Wait until auth is loaded
  if (loading) return <div>Loading...</div>  

  if (!user) return <Navigate to="/login" replace />  // <-- correct login path
  return children
}
