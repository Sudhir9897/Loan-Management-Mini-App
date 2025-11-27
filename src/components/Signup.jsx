import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, setUsers } from '../utils/storage'
import { toast } from 'react-toastify'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !email || !password || !phone || !city){
      toast.error('Please fill all fields')
      return
    }
    const users = getUsers()
    if(users.find(u => u.email === email)){
      toast.error('Email already exists')
      return
    }
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
    const newUser = { id: newId, email, password, otp: '111222', name, phone, city }
    users.push(newUser)
    setUsers(users)
    toast.success('Signup successful — please login')
    navigate('/')
  }

  return (
    <div className="form">
      <h3>Signup</h3>

      {/* Form submit on Enter */}
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />

        <div style={{ position: "relative", width: "100%" }}>
          <input
            className="input"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          {/* Normal eye icon */}
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

        <input className="input" placeholder="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="input" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />

        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <button className="btn" type="submit">Create Account</button>
          <button className="btn" type="button" style={{background:'#718096'}} onClick={()=>navigate('/')}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}
