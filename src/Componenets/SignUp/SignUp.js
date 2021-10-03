import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom"

export default function SignUp() {

    const {signup} = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)


    const initialData = {
        email: '',
        fullname: '',
        username: '',
        password: '',
    }
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const  handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signup(data)
            history.push("home")
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input name='email' className="logipage__text" type="text" placeholder="Mobile number or Email" onChange={handleChange}/>
            <input name='fullname' className="logipage__text" type="text" placeholder="Full Name" onChange={handleChange}/>
            <input name='username' className="logipage__text" type="text" placeholder="Username" onChange={handleChange}/>
            <input name='password' className="logipage__text" type="password" placeholder="Password" onChange={handleChange}/>
            <input className="login__button" disabled={loading} type='submit' value='Sign Up' />            </form>
        </div>
    )
}
