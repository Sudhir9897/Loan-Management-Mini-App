import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // <--- track initialization

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('logged_in_user') || 'null')
    if (u) setUser(u)
    setLoading(false) // done initializing
  }, [])

  const login = (userObj) => {
    setUser(userObj)
    localStorage.setItem('logged_in_user', JSON.stringify(userObj))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lm_loans')
    localStorage.removeItem('logged_in_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
