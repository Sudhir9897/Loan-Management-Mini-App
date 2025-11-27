import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function OTP(){
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const temp = JSON.parse(localStorage.getItem('lm_temp_login') || 'null')
  if(!temp) {
    // if accessed directly, redirect to login
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if(!temp){
      toast.error('Session expired. Please login again')
      navigate('/')
      return
    }
    if(otp === temp.otp){
      // finalize login
      login(temp)
      localStorage.removeItem('lm_temp_login')
      toast.success('OTP verified — logged in')
      navigate('/dashboard')
    } else {
      toast.error('Invalid OTP')
    }
  }

  return (
    <div className="form">
      <h3>Enter OTP for {temp ? temp.email : ''}</h3>
      <input className="input" placeholder="6-digit OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
      <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
        <button className="btn" onClick={handleVerify}>Verify OTP</button>
        <button className="btn" style={{background:'#e53e3e'}} onClick={()=>{ localStorage.removeItem('lm_temp_login'); navigate('/') }}>Cancel</button>
      </div>
    </div>
  )
}
