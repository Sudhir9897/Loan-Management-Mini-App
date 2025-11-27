import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../utils/storage'
import { toast } from 'react-toastify'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = getUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if(!found){
      toast.error('Invalid email or password')
      return
    }
    // store temp login for OTP validation
    localStorage.setItem('lm_temp_login', JSON.stringify(found))
    toast.success('Login successful. Enter OTP.')
    navigate('/otp')
  }

  return (
    <div className="form">
      <h3>Login</h3>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
        <button className="btn" onClick={handleSubmit}>Sign In</button>
        <button className="btn" style={{background:'#38a169'}} onClick={()=>{ navigate('/signup') }}>Signup</button>
      </div>
    </div>
  )
}
