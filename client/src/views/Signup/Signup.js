import React, { useState } from 'react'
import "./Signup.css"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Signup() {

    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        dob: ''
    })

    const signup = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, {
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            dob: user.dob
        })

        if (response.data.success) {
            toast.success(response.data.message)

            setUser({
                fullname: '',
                email: '',
                password: '',
                dob: ''
            })
        }
        else {
            toast.error(response.data.message)
        }
    }
    return (
        <div>
            <h1 className='header'>Signup Now</h1>

            <form className='signup-form'>
                <div className='inputs'>
                    <input
                        type='text'
                        className='name'
                        placeholder='Enter Your Name'
                        value={user.fullname}
                        onChange={(e) => {
                            setUser({ ...user, fullname: e.target.value })
                        }} />

                    <input type='email'
                        className='name'
                        placeholder='Enter Your Email'
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value })
                        }} />


                    <input type='password'
                        className='name'
                        placeholder='Enter Your Password'
                        value={user.password}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value })
                        }} />

                    <input type='date'
                        className='name'
                        placeholder='Enter your Date of Birth'
                        value={user.dob}
                        onChange={(e) => {
                            setUser({ ...user, dob: e.target.value })
                        }} />


                    <button type='button' className='btn-signup' onClick={signup}>Signup</button>
                   <p className='redirect'>Already have an account? <Link to='/login'> Login</Link></p> 
                </div>
            </form>


            <Toaster />
        </div>
    )
}

export default Signup