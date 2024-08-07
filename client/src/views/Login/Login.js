import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import "./Login.css"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: password
    })

    if (response.data.success) {
      toast.success(response.data.message)
      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

      toast.loading('Redirecting to dashboard')
      
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }
    
    else {
      toast.error(response.data.message)
    }
  

  }
  return (
    <div>
      <h1 className='header'>Login Now</h1>
      <form>
      <div className='inputs'>
        <input type='email'
          className='email'
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }} />


        <input type='password'
          className='password'
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }} />

        <button type='button' className='btn' onClick={loginNow}>Login</button>
        <p className='redirect' >Don't have an account? <Link to='/signup'>Signup</Link></p>
        </div>
      </form>

      
      <Toaster />
    </div>

  )
}

export default Login