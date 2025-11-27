import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const u = JSON.parse(localStorage.getItem('logged_in_user') || 'null')
    if(u) setUser(u)
  },[])

  const login = (userObj) => {
    setUser(userObj)
    localStorage.setItem('logged_in_user', JSON.stringify(userObj))
  }

  const logout = ()=> {
    setUser(null)
    localStorage.removeItem('logged_in_user')
  }

  return <AuthContext.Provider value={{user, login, logout}}>
    {children}
  </AuthContext.Provider>
}
