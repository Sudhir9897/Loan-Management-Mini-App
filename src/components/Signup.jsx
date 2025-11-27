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
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name||!email||!password||!phone||!city){
      toast.error('Please fill all fields')
      return
    }
    const users = getUsers()
    if(users.find(u => u.email === email)){
      toast.error('Email already exists')
      return
    }
    const newId = users.length ? Math.max(...users.map(u=>u.id)) + 1 : 1
    const newUser = { id: newId, email, password, otp: '111222', name, phone, city }
    users.push(newUser)
    setUsers(users)
    toast.success('Signup successful — please login')
    navigate('/')
  }

  return (
    <div className="form">
      <h3>Signup</h3>
      <input className="input" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <input className="input" placeholder="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)} />
      <input className="input" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
      <div style={{display:'flex', gap:8}}>
        <button className="btn" onClick={handleSubmit}>Create Account</button>
        <button className="btn" style={{background:'#718096'}} onClick={()=>navigate('/')}>Back to Login</button>
      </div>
    </div>
  )
}
