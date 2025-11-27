import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../utils/storage'
import { toast } from 'react-toastify'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = getUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if(!found){
      toast.error('Invalid email or password')
      return
    }
    localStorage.setItem('lm_temp_login', JSON.stringify(found))
    toast.success('Login successful. Enter OTP.')
    navigate('/otp')
  }

  return (
    <div className="form">
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <div style={{ position: "relative", width: "100%" }}>
          <input
            className="input"
            placeholder="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={e=>setPassword(e.target.value)}
          />

          {/* 👁 Normal Eye Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: 16,
              color: "#555"
            }}
          >
            {showPassword ? "👁" : "👁‍🗨"}
          </span>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
          <button className="btn" type="submit">Sign In</button>
          <button
            className="btn"
            style={{background:'#38a169'}}
            type="button"
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  )
}
